export const manageDate = (date) => {
    
    var d = new Date(date),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = d.getHours(),
    h = hh,
    min = ('0' + d.getMinutes()).slice(-2),
    ampm = 'AM',
    time;
        
    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }
    time = dd + '-' + mm + '-' + yyyy + ', ' + h + ':' + min + ' ' + ampm;
    return time;
}

export const titleName = (username) => {
    const nameArr = username.split(" ");
    var name;
    if(nameArr.length > 0){
        name = nameArr[0].charAt(0).toUpperCase() + nameArr[0].slice(1) + " " + nameArr[1].charAt(0).toUpperCase() + nameArr[1].slice(1)
    }else{
        name = nameArr[0].charAt(0).toUpperCase() + nameArr[0].slice(1) 
    }
    return name;
}
