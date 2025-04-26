

function isExpired(createdAt){
    
    const currentDate = new Date()
    
    // differnce in milliseconds
    const msDiff = currentDate - createdAt

    // convert milliseconds to days

    const dayDiff = Math.floor(msDiff / (1000 * 60 * 24))

    return dayDiff < 1;
    
}


module.exports = isExpired;