import Galaxy from "@/shared/components/animations/galaxy"

export const GalaxyAnimation = () => {
  return <Galaxy mouseRepulsion={true} mouseInteraction={true} density={1.5} glowIntensity={0.5} saturation={0.8} hueShift={240} />
}
