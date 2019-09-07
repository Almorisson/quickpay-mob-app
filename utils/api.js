/**
 * @function {} getImageFromId
 * @returns {fetch from the API and Return a collection of images }
 */
export const fetchImages = async () => {
    const response = await fetch("https://baseUrlOfTheAPI");
    const images = await response.json();
  
    return images;
  };
  
  /**
   * 
   * @param {return an image base on its id(in other ter its name) } id 
   * @function {} getImageFromId
   * @returns {Return an image resource by giving its FQN} 
   */
  export const getImageFromId = id => `https://baseUrlOfTheAPI/${width}/${height}?image=${id}`;
  