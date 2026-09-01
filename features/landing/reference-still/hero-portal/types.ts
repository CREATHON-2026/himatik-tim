export interface SphereCoordinates {
  x: number;
  y: number;
}

export interface HeroPortalState {
  mousePos: SphereCoordinates;
  lensPos: SphereCoordinates;
  scrollProgress: number;
  currentRadius: number;
  isIdle: boolean;
}
