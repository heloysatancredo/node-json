fetch('http://localhost:3000/clist').then((res) => {
    res.json().then((data) => {
        if(data.err) {
            console.log(data.err);
        } else {
            data.forEach(element => {
                custList.options[custList.options.length] = new Option(element.name, element.custID);
            });
        }
    })
})

view.addEventListener('click', (e) => {
    msgArea.innerHTML = '';
   
    let cid = custList.value;
    // alert(cid);
    fetch(`http://localhost:3000/ulookup?custID=${ cid }`).then((res) => {
        res.json().then((data) => {
            if(data.err) {
                msgArea.innerHTML = data.err;
                console.log(data.err);
            } else {
                console.log(data);
                custID.value = data.custID;
                custName.value = data.name;
                email.value = data.emailAddr;
                cName.value = data.company;
                sDate.value = data.sinceDate;
            }
        })
    })
})