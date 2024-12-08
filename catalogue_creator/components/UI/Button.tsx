"use client";

import React from "react";

export function Button({
  onClick,
  styles,
  buttonText,
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  styles: string;
  buttonText: string;
}) {
  return (
    <button type="button" className={styles} onClick={onClick}>
      {buttonText}
    </button>
  );
}
