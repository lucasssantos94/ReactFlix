export const TMDB_IMAGE_SIZES = {
  CARD_HORIZONTAL: 'w250_and_h141_face',
  CARD_VERTICAL: 'w185_and_h278_face',
  POSTER_SMALL: 'w300_and_h450_bestv2',
  PROFILE_SMALL: 'w45_and_h67_face',
  W92: 'w92',
  W154: 'w154',
  W185: 'w185',
  W342: 'w342',
  W400: 'w400',
  W500: 'w500',
  W780: 'w780',
  W1280: 'w1280',
  ORIGINAL: 'original',
} as const

export type TMDBImageSize = keyof typeof TMDB_IMAGE_SIZES
