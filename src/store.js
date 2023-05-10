
export default function store(todolibrary){
    if (typeof(Storage) !== "undefined") {
        // Store
        localStorage.setItem("librarystorage", JSON.stringify(todolibrary));
        // Retrieve
        const writelibrary = JSON.parse(localStorage.getItem("librarystorage"));
        console.log(writelibrary)
      } else {
        console.log("Sorry, your browser does not support Web Storage...")
      }
}

export function getStore(){
    if (typeof(Storage) !== "undefined" && localStorage.getItem("title")!=null) {
        // Retrieve
        let storedlibrary = JSON.parse(localStorage.getItem("librarystorage"))
        console.log(storedlibrary)
        return storedlibrary
      } else {
        return false;
      }
}