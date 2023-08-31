const tableBody = document.getElementById("table-body");
    function addRow(index,adhar,age,fullname,id,organ,timestamp) {
        const tr = document.createElement("tr");
        function addTd(value){
            const td = document.createElement("td");
            td.innerHTML = value;
            tr.appendChild(td);
        }
        addTd(index);
        addTd(id),
        addTd(fullname);
        addTd(adhar);
        addTd(age);
        addTd(organ);
        addTd(timestamp)
        tableBody.appendChild(tr);
        

    }
    fetch("/hospital_data").then(async (data) => {
        const jsonData = await data.json();
        // console.log(jsonData);
        jsonData.forEach((item,index) => {
           addRow(index+1,item.adhar,item.age,item.fullname,item.id,item.organ,item.createdAt);
        })
    }).catch(err => { console.log("Error", err) })