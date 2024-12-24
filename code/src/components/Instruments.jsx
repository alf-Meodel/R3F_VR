import React, { memo, useMemo, useCallback } from "react";
import { Cymbal } from "./Cymbal";
import { Drum } from "./Drum";
import { DrumCollider } from "./DrumCollider";
import { NOTES_COLORS, useSong } from "../hooks/useSong";

export const Instruments = memo(() => {
  const jouerNote = useSong((state) => state.playNote); // playNote -> jouerNote

  const collisionCymbale = useCallback(() => jouerNote("Crash"), [jouerNote]); // onHitCymbal -> collisionCymbale
  const collisionTambour1 = useCallback(() => jouerNote("Middle"), [jouerNote]); // onHitMiddle -> collisionTambour1
  const collisionTambour2 = useCallback(() => jouerNote("Side"), [jouerNote]); // onHitSide -> collisionTambour2

  //Instruments glb stockés en useMemo
  const instruments = useMemo(
    () => ({
      cymbale: <Cymbal scale={0.8} />, // cymbal -> cymbale
      milieu: <Drum color={NOTES_COLORS["Middle"]} scale={0.02} />, // middle -> milieu
      cote: <Drum color={NOTES_COLORS["Side"]} scale={0.02} />, // side -> cote
    }),
    []
  );

  return (
    <group>
      {/* Cymbale avec DrumCollider */}
      <group position={[0.1, 0.5, 0.5]}>
        <DrumCollider
          radius={0.15}
          height={0.1}
          position={[0, -0.05, 0]} // Ajustement pour Cymbale
          onHit={collisionCymbale} // onHit -> surFrapper
        />
        {instruments.cymbale}
      </group>

      <group position={[0.2, 0.2, 0.5]}>

        <DrumCollider
          radius={0.12}
          height={0.1}
          position={[0, 0.1, 0]} // Ajuste ici pour descendre
          onHit={collisionTambour1} // onHit -> surFrapper
        />
        {instruments.milieu}
      </group>

      <group position={[-0.1, 0.2, 0.5]}>
        <DrumCollider
          radius={0.12}
          height={0.1}
          position={[0, 0.1, 0]} // Ajuste ici pour descendre
          onHit={collisionTambour2} // onHit -> surFrapper
        />
        {instruments.cote}
      </group>
    </group>
  );
});