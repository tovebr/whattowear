export const getSection = (category: string) => {
  switch (category) {
    case 'shirt':
    case 't-shirt':
    case 'sweater':
    case 'cardigan':
      return 'tops';
    case 'pants':
    case 'skirt':
      return 'bottoms';
    case 'dress':
    case 'onepiece':
    default:
      return 'fullbody';
  }
};
