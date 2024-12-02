let novX = 0, novY = 0, startX = 0, startY = 0;
let poradiPC = 0, poradiSW = 0, poradiRouter = 0;
let PC = [], IPaddressPC = [], MaskPC = [], gatewayPC = [], switchConectPC = [], ROUTER = [], IPaddressRouter = [], MASK_ROUTER = [], switchConectRouter
let ipDev1 = [], ipDev2 = [], ipDev3 = [], ipDev4 = []
let prvek1, prvek1IP, prvek2, prvek2IP, lastOrder
let SW_DEV1text = [], SW_DEV2text = [], SW_DEV3text = [], SW_DEV4text = []
let SWporadi = []
let isConnecting = false;
let selectedElements = [];
let INT1ip = [], INT2ip = [], INT3ip = [], INT4ip = [];


//PC

document.getElementById("pridatPC").addEventListener("click", () => {
    poradiPC++
    const lokalniPoradi = poradiPC;
    const novyPrvek = document.createElement("div"); 
    novyPrvek.textContent = "PC " + poradiPC;
    PC[lokalniPoradi] = novyPrvek
    novyPrvek.classList.add("PC");
    novyPrvek.classList.add("draggable");
    novyPrvek.setAttribute("data-order", poradiPC)
    document.getElementById("pracProstor").appendChild(novyPrvek);

    //vytvořeni okna

    const novyOk = document.createElement("div")
    novyOk.classList.add("OKNO");
    novyOk.id = "PC" + poradiPC;
    document.getElementById("pracProstor").appendChild(novyOk);
    novyOk.style.display = "none"

    const cancel = document.createElement("div");
    cancel.textContent = "X"
    cancel.classList.add("ZRUSIT");

    cancel.addEventListener("click", () => {
        novyOk.style.display = "none"
    });

    novyOk.appendChild(cancel);

    zprava = document.createElement("div")
    zprava.classList.add("zprava");
    zprava.textContent = "PC " + poradiPC
    novyOk.appendChild(zprava);

    novyOk.addEventListener("mousedown", mysDole);

    novyPrvek.addEventListener("dblclick", () => {
        novyOk.style.display = "inline"
    })

    const textbox = document.createElement("input");
    textbox.type = "text"
    textbox.placeholder = "IP address"
    textbox.id = "IP_PC" + lokalniPoradi; 
    novyOk.appendChild(textbox)

    const textbox2 = document.createElement("input");
    textbox2.type = "text"
    textbox2.placeholder = "Subnet Mask"
    textbox2.id = "MASK_PC" + lokalniPoradi; 
    novyOk.appendChild(textbox2)

    const textbox3 = document.createElement("input");
    textbox3.type = "text"
    textbox3.placeholder = "Gateway"
    textbox3.id = "GATEWAY_PC" + lokalniPoradi; 
    novyOk.appendChild(textbox3)

    const SWconect = document.createElement("input");
    SWconect.type = "text"
    SWconect.placeholder = "Switch conect"
    SWconect.id = "SWconect" + lokalniPoradi; 
    novyOk.appendChild(SWconect)

    const bt1 = document.createElement("div");
    bt1.textContent = "OK"
    bt1.classList.add("bt1");
    bt1.id = "OKNO_OK" + lokalniPoradi; 
    novyOk.appendChild(bt1)

    const textbox4 = document.createElement("input");
    textbox4.type = "text"
    textbox4.classList.add("pingBox")
    textbox4.placeholder = "Ping device ip address"
    textbox4.id = "PCping" + lokalniPoradi; 
    novyOk.appendChild(textbox4)

    const bt2 = document.createElement("div");
    bt2.textContent = "PING"
    bt2.classList.add("bt1");
    bt2.id = "PINGbt" + lokalniPoradi; 
    novyOk.appendChild(bt2)

    const oznameni = document.createElement("div")
    oznameni.classList.add("oznameni")
    oznameni.id = "OZNAMENI" + poradiPC;
    novyOk.appendChild(oznameni);

    bt1.addEventListener("click", () =>
    {
        IPaddressPC[lokalniPoradi] = textbox.value
        console.log("Ip pc" + lokalniPoradi + ": " + IPaddressPC[lokalniPoradi])
        MaskPC[lokalniPoradi] = textbox2.value
        console.log("Mask pc" + lokalniPoradi + ": " + MaskPC[lokalniPoradi])
        gatewayPC[lokalniPoradi] = textbox3.value
        console.log("Default gateway pc" + poradiPC + ": " + gatewayPC[lokalniPoradi])
        console.log("Switch conect" + poradiPC + ": " + switchConectPC[lokalniPoradi])
    });

    bt2.addEventListener("click", () =>
        {
            try {SWnum = switchConectPC[lokalniPoradi][2]}
            catch {console.log("No switch")}
            
            try{ if( textbox4.value == ipDev1[SWnum] || textbox4.value == ipDev2[SWnum] || textbox4.value == ipDev3[SWnum] || textbox4.value == ipDev4[SWnum] )
            {
                console.log("PC se propojila")
                oznameni.classList.remove("nepropojila")
                oznameni.classList.add("propojila")
                oznameni.textContent = "PC se propojila"
            }
            else throw new Error
            }
            catch{ console.log("PC se nepropojila")
                oznameni.classList.remove("propojila")
                oznameni.classList.add("nepropojila")
                oznameni.textContent = "PC se nepropojila"
            }
            FirstPing = true
        });

    novyPrvek.addEventListener("mousedown", mysDole);
});

//SW

document.getElementById("pridatSW").addEventListener("click", () => {
    poradiSW++
    const lokalniPoradi = poradiSW
    const novyPrvek = document.createElement("div"); 
    novyPrvek.textContent = "Switch " + poradiSW;
    novyPrvek.classList.add("SW");
    novyPrvek.classList.add("draggable");
    novyPrvek.setAttribute("data-order", poradiSW)
    document.getElementById("pracProstor").appendChild(novyPrvek);

    const novyOk = document.createElement("div")
    novyOk.classList.add("OKNO");
  
    novyOk.id = "Switch" + lokalniPoradi;
    document.getElementById("pracProstor").appendChild(novyOk);
    novyOk.style.display = "none"

    const cancel = document.createElement("div");
    cancel.textContent = "X"
    cancel.classList.add("ZRUSIT");

    cancel.addEventListener("click", () => {
        novyOk.style.display = "none"
    });

    novyOk.appendChild(cancel);

    zprava = document.createElement("div")
    zprava.classList.add("zprava");
    zprava.textContent = "SW " + lokalniPoradi
    novyOk.appendChild(zprava);

    novyOk.addEventListener("mousedown", mysDole);

    novyPrvek.addEventListener("dblclick", () => {
        novyOk.style.display = "inline"
    })

    const textbox1 = document.createElement("input");
    textbox1.type = "text"
    textbox1.placeholder = "Device1"
    textbox1.id = "DE1_IP_SW" + lokalniPoradi; 
    SW_DEV1text[lokalniPoradi] = textbox1
    novyOk.appendChild(SW_DEV1text[lokalniPoradi])

    const textbox2 = document.createElement("input");
    textbox2.type = "text"
    textbox2.placeholder = "Device2"
    textbox2.id = "DE2_IP_SW" + lokalniPoradi; 
    SW_DEV2text[lokalniPoradi] = textbox2
    novyOk.appendChild(SW_DEV2text[lokalniPoradi])

    const textbox3 = document.createElement("input");
    textbox3.type = "text"
    textbox3.placeholder = "Device3"
    textbox3.id = "DE3_IP_SW" + lokalniPoradi; 
    SW_DEV3text[lokalniPoradi] = textbox3
    novyOk.appendChild(SW_DEV3text[lokalniPoradi])

    const textbox4 = document.createElement("input");
    textbox4.type = "text"
    textbox4.placeholder = "Device4"
    textbox4.id = "DE4_IP_SW" + lokalniPoradi; 
    SW_DEV4text[lokalniPoradi] = textbox4
    novyOk.appendChild(SW_DEV4text[lokalniPoradi])

    const bt1 = document.createElement("div");
    bt1.textContent = "OK"
    bt1.classList.add("bt1");
    bt1.id = "OKNO_OK" + lokalniPoradi; 
    novyOk.appendChild(bt1)

    bt1.addEventListener("click", () =>
    {
        let SW_DEV1 = textbox1.value, SW_DEV2 = textbox2.value, SW_DEV3 = textbox3.value, SW_DEV4 = textbox4.value

        textbox1.value.trim() === "" ? ipDev1[lokalniPoradi] = "none": ipDev1[lokalniPoradi] = IPaddressPC[SW_DEV1[2]]
        console.log("Switch"+ lokalniPoradi+" device 1 ip address: " + ipDev1[lokalniPoradi])
        textbox2.value.trim() === "" ? ipDev2[lokalniPoradi] = "none": ipDev2[lokalniPoradi] = IPaddressPC[SW_DEV2[2]]
        console.log("Switch"+ lokalniPoradi+" device 2 ip address: " + ipDev2[lokalniPoradi])
        textbox3.value.trim() === "" ? ipDev3[lokalniPoradi] = "none": ipDev3[lokalniPoradi] = IPaddressPC[SW_DEV3[2]]
        console.log("Switch"+ lokalniPoradi+" device 3 ip address: " + ipDev3[lokalniPoradi])
        textbox4.value.trim() === "" ? ipDev4[lokalniPoradi] = "none": ipDev4[lokalniPoradi] = IPaddressPC[SW_DEV4[2]]
        console.log("Switch"+ lokalniPoradi+" device 4 ip address: " + ipDev4[lokalniPoradi])

    });

    novyPrvek.addEventListener("mousedown", mysDole);

    novyPrvek.addEventListener("mousedown", mysDole);
});

// ROUTER

document.getElementById("pridatRoutr").addEventListener("click", () => {
    poradiRouter++
    const lokalniPoradi = poradiRouter
    const novyPrvek = document.createElement("div");
    novyPrvek.textContent = "Router " + poradiRouter;
    novyPrvek.classList.add("Router")
    novyPrvek.classList.add("draggable")
    document.getElementById("pracProstor").appendChild(novyPrvek);
    ROUTER[lokalniPoradi]  = novyPrvek
    //vytvořeni okna

    const novyOk = document.createElement("div")
    novyOk.classList.add("OKNO");
    novyOk.id = "ROUTER" + poradiRouter;
    document.getElementById("pracProstor").appendChild(novyOk);
    novyOk.style.display = "none"

    const cancel = document.createElement("div");
    cancel.textContent = "X"
    cancel.classList.add("ZRUSIT");

    cancel.addEventListener("click", () => {
        novyOk.style.display = "none"
    });
    novyOk.appendChild(cancel);

    const zprava = document.createElement("div")
    zprava.classList.add("zprava");
    zprava.textContent = "ROUTER " + poradiRouter
    novyOk.appendChild(zprava);

    novyOk.addEventListener("mousedown", mysDole);

    novyPrvek.addEventListener("dblclick", () => {
        novyOk.style.display = "inline"
    })

    const Interface1 = document.createElement("div");
    Interface1.textContent = "INTERFACE1"
    Interface1.classList.add("INTbt");
    Interface1.id = "routerInt1_" + lokalniPoradi; 
    novyOk.appendChild(Interface1)

    const Interface2 = document.createElement("div");
    Interface2.textContent = "INTERFACE2"
    Interface2.classList.add("INTbt");
    Interface2.id = "routerInt2_" + lokalniPoradi; 
    novyOk.appendChild(Interface2)

    const Interface3 = document.createElement("div");
    Interface3.textContent = "INTERFACE3"
    Interface3.classList.add("INTbt");
    Interface3.id = "routerInt3_" + lokalniPoradi; 
    novyOk.appendChild(Interface3)

    const Interface4 = document.createElement("div")
    Interface4.textContent = "INTERFACE4"
    Interface4.classList.add("INTbt")
    Interface4.id = "routerInt4_" + lokalniPoradi
    novyOk.appendChild(Interface4)
    
    vytOkno(1); vytOkno(2); vytOkno(3); vytOkno(4);

    Interface1.addEventListener("click", () =>{document.getElementById("INTERFACE1" + poradiRouter).style.display = "inline"})
    Interface2.addEventListener("click", () =>{document.getElementById("INTERFACE2" + poradiRouter).style.display = "inline"})
    Interface3.addEventListener("click", () =>{document.getElementById("INTERFACE3" + poradiRouter).style.display = "inline"})
    Interface4.addEventListener("click", () =>{document.getElementById("INTERFACE4" + poradiRouter).style.display = "inline"})

    novyPrvek.addEventListener("mousedown", mysDole);
});

// funkce pro přidání kabelu

document.getElementById("pridatKabel").addEventListener("click", () => {
    console.log("CONECTING MOD")
    isConnecting = true;
    selectedElements = [];
  });

document.getElementById("pracProstor").addEventListener("click", (e) => {
    if(!e.target.classList.contains("draggable")){if (isConnecting == true)console.log("CONECTING MOD END"); isConnecting = false}
    else if (isConnecting) { 
        selectedElements.push(e.target);
        const order = e.target.getAttribute("data-order")
        console.log(`Klikl jsi na PC s pořadím: ` + order)

        if (selectedElements.length == 1) {
            if (e.target.classList.contains("PC")) {prvek1 = "PC"; prvek1IP = IPaddressPC[order]} 
            if (e.target.classList.contains("SW")) prvek1 = "SW";
            if (e.target.classList.contains("router")) prvek1 = "router";}

        if (selectedElements.length == 2) {
            if(e.target.classList.contains("SW") && prvek1 == "PC") {
                if (SWporadi[order] === undefined) {
                    SWporadi[order] = 0;}
                SWporadi[order]++;
                console.log("SWporadi: " + SWporadi[order])
                if (SWporadi[order] == 1) {SW_DEV1text[order].value = prvek1+""+lastOrder; ipDev1[order] = IPaddressPC[lastOrder];console.log("ORDER: "+order);switchConectPC[lastOrder] = "SW"+order;console.log("PC SWconect: SW"+order) ;console.log("LAST_ORDER: "+lastOrder);}
                if (SWporadi[order] == 2) {SW_DEV2text[order].value = prvek1+""+lastOrder; ipDev2[order] = IPaddressPC[lastOrder];console.log("ORDER: "+order);switchConectPC[lastOrder] = "SW"+order;console.log("PC SWconect: SW"+order) ;console.log("LAST_ORDER: "+lastOrder);}
                if (SWporadi[order] == 3) {SW_DEV3text[order].value = prvek1+""+lastOrder; ipDev3[order] = IPaddressPC[lastOrder];console.log("ORDER: "+order);switchConectPC[lastOrder] = "SW"+order;console.log("PC SWconect: SW"+order) ;console.log("LAST_ORDER: "+lastOrder);}
                if (SWporadi[order] == 4) {SW_DEV4text[order].value = prvek1+""+lastOrder; ipDev4[order] = IPaddressPC[lastOrder];console.log("ORDER: "+order);switchConectPC[lastOrder] = "SW"+order;console.log("PC SWconect: SW"+order) ;console.log("LAST_ORDER: "+lastOrder);}
            }
            createLine(selectedElements[0], selectedElements[1]);
            isConnecting = false; console.log("CONECTING MOD END")
        }
        lastOrder = order
    }
});

function createLine(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
  
    const x1 = rect1.left + rect1.width / 2;
    const y1 = rect1.top + rect1.height / 2;
    const x2 = rect2.left + rect2.width / 2;
    const y2 = rect2.top + rect2.height / 2;
  
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", "2");
    document.getElementById("line-container").appendChild(line);
  
    const updateLine = () => {
      const newRect1 = el1.getBoundingClientRect();
      const newRect2 = el2.getBoundingClientRect();
  
      line.setAttribute("x1", newRect1.left + newRect1.width / 2);
      line.setAttribute("y1", newRect1.top + newRect1.height / 2);
      line.setAttribute("x2", newRect2.left + newRect2.width / 2);
      line.setAttribute("y2", newRect2.top + newRect2.height / 2);
    };
  
    el1.addEventListener("mousemove", updateLine);
    el2.addEventListener("mousemove", updateLine);
  }


function mysDole(e) {
    const prvek = e.target;  
    startX = e.clientX;
    startY = e.clientY;

    document.addEventListener("mousemove", mysPohyb);
    document.addEventListener("mouseup", mysNahore);

    function mysPohyb(e) {
        novX = startX - e.clientX;
        novY = startY - e.clientY;

        startX = e.clientX;
        startY = e.clientY;

        prvek.style.top = prvek.offsetTop - novY + "px";
        prvek.style.left = prvek.offsetLeft - novX + "px";
    }

    function mysNahore(e) {
        document.removeEventListener("mousemove", mysPohyb);
    }

}

function vytOkno(INTERFACE)
    {
        const lokalniPoradi = poradiRouter
        const novyOk = document.createElement("div")
        novyOk.classList.add("OKNO");
        novyOk.id = "INTERFACE"+INTERFACE+"" + poradiRouter;
        document.getElementById("pracProstor").appendChild(novyOk);
        novyOk.style.display = "none"

        const cancel = document.createElement("div");
        cancel.textContent = "X"
        cancel.classList.add("ZRUSIT");

        cancel.addEventListener("click", () => {
            novyOk.style.display = "none"
        });

        novyOk.appendChild(cancel);

        novyOk.addEventListener("mousedown", mysDole);

        const zprava = document.createElement("div")
        zprava.classList.add("zprava");
        zprava.textContent = "\n INTERFACE "+INTERFACE
        novyOk.appendChild(zprava);
    
        console.log("routerInt"+INTERFACE+"_" + lokalniPoradi)
        document.getElementById("routerInt"+INTERFACE+"_" + lokalniPoradi).addEventListener("click", () => {
        novyOk.style.display = "inline"})

        const textbox = document.createElement("input");
        textbox.type = "text"
        textbox.placeholder = "IP address"
        textbox.id = "IP_ROUTER" + lokalniPoradi; 
        novyOk.appendChild(textbox)

        const textbox2 = document.createElement("input");
        textbox2.type = "text"
        textbox2.placeholder = "Subnet Mask"
        textbox2.id = "MASK_ROUTER" + lokalniPoradi; 
        novyOk.appendChild(textbox2)

        const SWconect = document.createElement("input");
        SWconect.type = "text"
        SWconect.placeholder = "Switch conect"
        SWconect.id = "SWconect" + lokalniPoradi; 
        novyOk.appendChild(SWconect)

        const bt1 = document.createElement("div");
        bt1.textContent = "OK"
        bt1.classList.add("bt1");
        bt1.id = "OKNO_OK" + lokalniPoradi; 
        novyOk.appendChild(bt1)

        bt1.addEventListener("click", () =>
        {
            if (INTERFACE == 1){
                INT1ip[lokalniPoradi] = textbox.value
                console.log("INT1ip: "+ INT1ip[lokalniPoradi])
            }
            else if (INTERFACE == 2){
                INT2ip[lokalniPoradi] = textbox.value
                console.log("INT2ip: "+ INT2ip[lokalniPoradi])
            }
            else if (INTERFACE == 3){
                INT3ip[lokalniPoradi] = textbox.value
                console.log("INT3ip: "+ INT3ip[lokalniPoradi])
            }
            else if (INTERFACE == 4){
                INT4ip[lokalniPoradi] = textbox.value
                console.log("INT4ip: "+ INT4ip[lokalniPoradi])
            }
            else console.log("INTERFACE ERROR")
        });
        
    }
