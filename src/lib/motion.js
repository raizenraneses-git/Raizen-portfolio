import { reducedBeatSeconds, useDurationTokens } from "@/lib/duration-tokens";

export const springSnappy = { stiffness: 300, damping: 30 };
export const springSoft = { stiffness: 120, damping: 20 };

/** Mirrors --ease-out-quart. */
export const easeOutQuart = [0.25, 1, 0.5, 1];
/** Mirrors --ease-out-expo (default for entrances). */
export const easeOutExpo = [0.16, 1, 0.3, 1];
/** Mirrors --ease-in-out-quart (movement from A to B). */
export const easeInOutQuart = [0.76, 0, 0.24, 1];

/** Whether a value carries its own token-backed beat. */
function hasBeat(value) {
  return (typeof value === "object" &&
  value !== null && typeof (value).token === "string");
}

/**
 * One spec as a `Transition`, with the beat left unresolved until Motion asks
 * for it.
 *
 * The laziness is the whole mechanism (#455 rounds 11 to 13), and it is
 * confined to exactly one field. Motion reads a transition's `duration` when it
 * *starts* an animation, which is always inside an effect and therefore always
 * after the DOM exists. A value resolved during render would be resolved before
 * the first commit, when there is nothing to read a token off and the only
 * possible answer is the fallback - so the token would be honoured on every
 * render except the one that matters. A getter moves the read to the one moment
 * the answer is knowable.
 *
 * Everything else is copied straight across, because everything else is already
 * known. A nested per-value override carrying its own `token`/`seconds` pair is
 * built the same way, recursively; one without them is copied verbatim, which
 * is how a spring stays a spring.
 */
function buildLazyTransition(spec, duration, reducedMotion) {
  const target = {};

  for (const [key, value] of Object.entries(spec)) {
    // This module's own vocabulary. Motion reads an unknown key on a
    // transition as a per-value override, so leaving them on would ask it to
    // animate a value called "token".
    if (key === "token" || key === "seconds" || key === "reducedSeconds") continue;
    target[key] = hasBeat(value)
      ? buildLazyTransition(value, duration, reducedMotion)
      : value;
  }

  const { token, seconds, reducedSeconds } = spec;
  if (token !== undefined && seconds !== undefined) {
    Object.defineProperty(target, "duration", {
      enumerable: true,
      configurable: true,
      get: () =>
        // docs/04 under reduce: content is immediately visible, and the
        // movement is either gone or a short opacity fade. Which of the two is
        // the component's own decision, carried by `reducedSeconds` and
        // clamped to the 200ms ceiling; whether reduce applies at all is the
        // component's own answer, handed in rather than decided here.
        reducedMotion ? reducedBeatSeconds(reducedSeconds) : duration(token, seconds),
    });
  }

  return target;
}

/**
 * Build this component's `Transition` objects with their beats taken from the
 * motion tokens (docs/13).
 *
 * One hook per component, however many transitions it has, so a component with
 * eight beats does not acquire eight hooks:
 *
 * ```tsx
 * const reduce = useReducedMotion() ?? false;
 * const rootRef = useRef<HTMLDivElement>(null);
 * const { reveal, swap } = useTokenTransitions(
 *   rootRef,
 *   {
 *     reveal: { token: "--dur-3", seconds: 0.6, ease: easeOutExpo },
 *     swap: { token: "--dur-2", seconds: 0.3, ease: easeOutQuart },
 *   },
 *   reduce,
 * );
 * // <m.div ref={rootRef} transition={reveal} />
 * ```
 *
 * The objects are rebuilt on every render, exactly as the inline
 * `{ duration: 0.3, ease }` literals they replace were, so a spec field that
 * varies with state (`ease: open ? a : b`) is always current. Only the token
 * *reader* is stable, and it is the only thing that needs to be: it carries the
 * per-mount cache that keeps the resolve off the frame path. Do not put a
 * returned transition in a dependency array - it is a fresh object each render,
 * as its predecessor was.
 *
 * @param scope Element the tokens are resolved against, normally the
 *   component's own root. See `useDurationTokens`.
 * @param specs One entry per transition the component needs.
 * @param reducedMotion The component's own `useReducedMotion() ?? false`. While
 *   it is set, each token-backed beat resolves to its spec's `reducedSeconds`,
 *   or to `0` when the spec names none - docs/04's two allowed answers, with
 *   the component choosing between them rather than the helper. Required, and
 *   taken as an argument rather than read here, for two reasons. A component
 *   that already branches on reduce keeps **one** answer to that question
 *   instead of two that can disagree; and a component whose real gate is
 *   broader than the media query - `text-rotate` waits for a
 *   `(prefers-reduced-motion: no-preference)` match before it animates at all -
 *   can hand in that gate rather than a weaker one. Required rather than
 *   optional so it cannot be quietly left off.
 * @returns The same keys, each a `Transition` ready to hand to Motion.
 */
export function useTokenTransitions(scope, specs, reducedMotion) {
  const duration = useDurationTokens(scope);
  const transitions = {};
  for (const key of Object.keys(specs)) {
    transitions[key] = buildLazyTransition(specs[key], duration, reducedMotion);
  }
  return transitions;
}
