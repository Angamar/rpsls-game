// Map of variant names to CSS module class names
export const variantClassMap: Record<string, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'body',
  bodySm: 'bodySm',
  bodyXs: 'bodyXs',
  mono: 'mono',
  bold: 'bold',
  italic: 'italic',
  uppercase: 'uppercase',
  capitalize: 'capitalize',
  tieResultHero: 'resultHero tie',
  winResultHero: 'resultHero win',
  loseResultHero: 'resultHero lose',
  setResultHero: 'setResultHero',
  menuHero: 'menuHero',
  scissors: 'scissors',
  rock: 'rock',
  paper: 'paper',
  lizard: 'lizard',
  spock: 'spock',
  buttonText: 'buttonText',
  heroButtonText: 'heroButtonText',
};

export type TypographyVariant = keyof typeof variantClassMap;
