import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";

const NetworkScene = lazy(() => import("./NetworkScene"));

function Fallback() {
  return <div className="absolute inset-0 hero-glow" aria-hidden="true" />;
}

class GLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroVisual() {
  const [env, setEnv] = useState<{ ok: boolean; mobile: boolean; reduced: boolean } | null>(null);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEnv({
      ok: hasWebGL(),
      mobile: window.matchMedia("(max-width: 768px)").matches,
      reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });

    if (typeof IntersectionObserver === "undefined" || !containerRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry ? entry.isIntersecting : true);
      },
      { threshold: 0.05 },
    );
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 md:pointer-events-auto">
      <Fallback />
      {env?.ok && (
        <GLBoundary>
          <Suspense fallback={null}>
            <div className="absolute inset-0 opacity-40 md:left-[38%] md:opacity-100 fade-up">
              <NetworkScene mobile={env.mobile} reduced={env.reduced} visible={visible} />
            </div>
          </Suspense>
        </GLBoundary>
      )}
    </div>
  );
}
