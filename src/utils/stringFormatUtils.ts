export const toCapitalizedWords = (str: string) => {
  return str
    .toLowerCase()          
    .split(' ')                               
    .filter(word => word.length > 0)     
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(' ');                            
}