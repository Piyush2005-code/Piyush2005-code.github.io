import React from 'react';
import { SplineScene } from './ui/SplineScene';
import { Card } from './ui/Card';
import { Spotlight } from './ui/Spotlight';

// Corner-anchored 3D robot, composed from the Card/Spotlight/SplineScene
// trio. Kept deliberately small and absolutely positioned so it drops into
// the hero as a decorative accent without reflowing the existing headline,
// CTAs, or stats column.
const RobotPanel = () => {
  return (
    <div className="hero-robot-panel">
      <Card className="ui-card--robot">
        <Spotlight className="hero-robot-spotlight" size={260} fill="white" />
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="hero-robot-scene"
        />
      </Card>
    </div>
  );
};

export default RobotPanel;
