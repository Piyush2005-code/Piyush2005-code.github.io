import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

// Renders a Spline 3D scene, code-split behind React.lazy so the (fairly
// heavy) @splinetool runtime only downloads once this component mounts.
export function SplineScene({ scene, className }) {
  return (
    <Suspense
      fallback={
        <div className="spline-loader-wrap">
          <span className="loader" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}

export default SplineScene;
