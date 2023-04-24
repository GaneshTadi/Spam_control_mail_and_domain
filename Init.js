/**
 * Initialise App to get events from Mail
 * Return @param {*} initObj contains the Night Mode, language and font details
 */
window.AppSDK = SigmaSDK.MAIL.init(() => {
    AppSDK.dispatch("drop", {
        isListen: true
    });
    window.appView.populateNotebooks();
    window.appView.populateAppData();
});

let populateMailDetails = function(mailInfo) {
    window.appView.populateCurrentMailDetails(mailInfo);
    window.appView.populateAttachmentDetails(mailInfo);
    if (mailInfo.FROM) {
        $(".search_input").val(mailInfo.FROM);
        $("#contactBtn").click();
    }
    window.appView.populateRelationalData(mailInfo.MSGID);
};

/**
 * Subscribe to Events you need using ZMSDK.app.on()
 */
var AllMails = [];
var All_Domain = [];
AppSDK.on("mail_preview", function(mailObj) {
    window.apiUtil.getMailDetails(mailObj.MSGID).then(function(mailInfo) {
        console.log("onload mailinfo error:",mailObj.MSGID);
        document.getElementById("control").style.display = "none";
        document.getElementById("Note").style.display = "block";
        document.getElementById("pre").style.display = "none";
        document.getElementById("centerDiv").style.display = "block";

        console.log('klk',mailInfo);


        var Domains = [];
        // var domains_org = [];
        // console.log("domains_org:", domains_org);
        var from = mailInfo.FROM;
        // console.log("FFrom", from);


        var cc = mailInfo.CC;
        // console.log("cc", cc);
        // var bcc = mailInfo.BCC;
        // console.log("BCC", bcc);

        var container = document.getElementById("maildet");
        var butn = document.getElementById("button");
        container.innerHTML = "";
        butn.innerHTML = "";

        // *****Filer Emails and respective organization****//

        // AppSDK.dispatch("invokeUrl", {


        //     xhrObj: {
        //         "url": "https://mail.zoho.com/api/organization",
        //         "type": "GET",
        //         "headers": {
        //             "Content-Type": "application/json"
        //         },
        //         "serviceName": "SpamMail"
        //     }

        // }).then(function(successResponse) {
        //         var succ = JSON.stringify(successResponse);
        //         // console.log(succ);
        //         var res = JSON.parse(succ);
        //         var respon = res.response;
        //         let rr = JSON.parse(respon);
        //         var data1 = rr.data;
        //         var domains1 = data1.domains;
        //       for(var i in domains1){
        //             console.log("domains_org22:", domains1[i]);
        //             domains_org.push(domains1[i]);

        //       }


        //         // var domain2 = domains1[0];
        //         // console.log("domains_org22:", domain2);
        //         // domains_org.push(domain2);


        //     },

        //     function(errorResponse) {
        //         // console.log(JSON.stringify(errorResponse));
        //         var resp = JSON.stringify(errorResponse);

        //     }

        // );


        // *****End Filer Emails and respective organization****//




        //***Emails getting ****//

        //**From email **//

        var elabel = document.createElement("LABEL");
        // var lblfrom = document.createTextNode(from);
        elabel.appendChild(document.createTextNode(from));
        elabel.setAttribute("id", from);
        elabel.setAttribute("style", "font-size: 12px; align-items: center;display: inline-flex;flex: 0 0 auto; font-weight: 500; justify-content: center; outline: 0;position: relative; text-decoration: none; transition-duration: .28s;transition-property: box-shadow,transform,opacity;transition-timing-function: cubic-bezier(.4,0,.2,1);vertical-align: middle;white-space: nowrap;border-style: initial;");
        AllMails.push(from);
        Domains.push(from);

        //**Allow button**//

        var f_email_allow_btn = document.createElement("BUTTON");
        // f_email_allow_btn.appendChild(document.createTextNode("Allow"));

        var icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-check-circle-o");
        f_email_allow_btn.appendChild(icon);
        icon.setAttribute("style", "font-size:18px");

        f_email_allow_btn.onclick = function(e) {
            emailallow(e);
        };
        icon.setAttribute("id", from + "_allowemail");
        f_email_allow_btn.setAttribute("id", from + "_allowemail");
        icon.setAttribute("title", "Whitelist Email");
        // f_email_allow_btn.setAttribute("id", from + "_allowemail");
        f_email_allow_btn.setAttribute("style", "height: 26px;min-width: 24px; font-size: 10px;color: green; margin-top: -8px; margin-left: 39px;align-items: center;display: inline-flex;flex: 0 0 auto; font-weight: 500; justify-content: center; outline: 0;position: relative; text-decoration: none; text-transform: uppercase;transition-duration: .28s;transition-property: box-shadow,transform,opacity;transition-timing-function: cubic-bezier(.4,0,.2,1);vertical-align: middle;white-space: nowrap;border-style: initial;");
        var ebr = document.createElement('br');

        //**Allow button end**//  

        //**Block button**//
        var f_email_block_btn = document.createElement("BUTTON");
        // f_email_block_btn.appendChild(document.createTextNode("Block"));
        var icon1 = document.createElement("i");
        icon1.setAttribute("class", "fa fa-ban");
        icon1.setAttribute("title", "Blacklist Email");
        f_email_block_btn.appendChild(icon1);
        icon1.setAttribute("style", "font-size:18px");
        f_email_block_btn.onclick = function(e) {
            fun_Blockmail(e);
        };

        icon1.setAttribute("id", from + "_blockemail");
        f_email_block_btn.setAttribute("id", from + "_blockemail");
        f_email_block_btn.setAttribute("style", "height: 26px;min-width: 24px; font-size: 10px;color: red; margin-top: -8px; margin-left: 5px;align-items: center;display: inline-flex;flex: 0 0 auto; font-weight: 500; justify-content: center; outline: 0;position: relative; text-decoration: none; text-transform: uppercase;transition-duration: .28s;transition-property: box-shadow,transform,opacity;transition-timing-function: cubic-bezier(.4,0,.2,1);vertical-align: middle;white-space: nowrap;border-style: initial;");
        //**End Block button**//

        // **Clear button** //
        var f_email_clear_btn = document.createElement("BUTTON");
        // f_email_clear_btn.appendChild(document.createTextNode("clear"));
        var icon2 = document.createElement("i");
        icon2.setAttribute("class", "fa fa-times-circle-o");
        icon2.setAttribute("title", "Remove Whitelist/Blacklist");
        f_email_clear_btn.appendChild(icon2);
        icon2.setAttribute("style", "font-size:18px");
        f_email_clear_btn.onclick = function(e) {
            fun_clearmail(e);
        };

        icon2.setAttribute("id", from + "_clearemail");
        // f_email_clear_btn.setAttribute("id", from + "_allowemail");
        f_email_clear_btn.setAttribute("style", "height: 26px;min-width: 24px; font-size: 10px;color: black; margin-top: -8px; margin-left: 5px;align-items: center;display: inline-flex;flex: 0 0 auto; font-weight: 500; justify-content: center; outline: 0;position: relative; text-decoration: none; text-transform: uppercase;transition-duration: .28s;transition-property: box-shadow,transform,opacity;transition-timing-function: cubic-bezier(.4,0,.2,1);vertical-align: middle;white-space: nowrap;border-style: initial;");
        butn.appendChild(f_email_clear_btn);
        // **End Clear button** //

        var ebr2 = document.createElement('br');
        container.appendChild(elabel);
        container.appendChild(ebr2);
        butn.appendChild(f_email_allow_btn);
        butn.appendChild(f_email_block_btn);
        butn.appendChild(f_email_clear_btn);
        butn.appendChild(ebr);

        //**End From email **//


        //**Cc email **//

        if (cc !== '') {
            const emails = cc;
            const array = emails.split(',');
            const newArrey = array.map((email) => email.replace('<', '').replace('>', ''));
            //console.log('array:hgfc', newArrey);
            var remarray = [];

            // console.log("remarray", remarray);
            for (const c in newArrey) {
                var space_email = newArrey[c];
                // console.log(space_email);
                var remove = space_email.split('"');
                // console.log("removeooo:",remove)
                // const myArray = text.split(",");
                // myArray[2]; 
                remarray.push(remove[2]);
                // AllMails.push(remove[2]);
                Domains.push(remove[2]);

            }

            for (const c1 in remarray) {
                var ind_c = remarray[c1];

                AllMails.push(ind_c);
                if (from != ind_c) {
                    // console.log("indexremArray ", ind_c);

                    var clabel = document.createElement("LABEL");
                    // var lblfrom = document.createTextNode(from);
                    clabel.appendChild(document.createTextNode(remarray[c1]));
                    clabel.setAttribute("id", remarray[c1]);
                    clabel.setAttribute("style", "font-size: 12px; align-items: center;display: inline-flex;flex: 0 0 auto; font-weight: 500; justify-content: center; outline: 0;position: relative; text-decoration: none; transition-duration: .28s;transition-property: box-shadow,transform,opacity;transition-timing-function: cubic-bezier(.4,0,.2,1);vertical-align: middle;white-space: nowrap;border-style: initial;");
                    //**Allow button**//
                    var cc_email_allow_btn = document.createElement("BUTTON");
                    // var et1 = document.createTextNode("Allow");

                    var icon_c = document.createElement("i");
                    icon_c.setAttribute("class", "fa fa-check-circle-o");
                    icon_c.setAttribute("title", "Whitelist Email");
                    cc_email_allow_btn.appendChild(icon_c);
                    icon_c.setAttribute("style", "font-size:18px");

                    cc_email_allow_btn.onclick = function(e) {
                        emailallow(e);
                    };
                    icon_c.setAttribute("id", remarray[c1] + "_allowemail");
                    cc_email_allow_btn.setAttribute("id", remarray[c1] + "_allowemail");
                    cc_email_allow_btn.setAttribute("style", "height: 26px;min-width: 24px; font-size: 10px;color: green; margin-top: -8px; margin-left: 39px;align-items: center;display: inline-flex;flex: 0 0 auto; font-weight: 500; justify-content: center; outline: 0;position: relative; text-decoration: none; text-transform: uppercase;transition-duration: .28s;transition-property: box-shadow,transform,opacity;transition-timing-function: cubic-bezier(.4,0,.2,1);vertical-align: middle;white-space: nowrap;border-style: initial;");

                    var ebr1 = document.createElement('br');
                    // cc_email_allow_btn.appendChild(et1);
                    //**Allow button end**//

                    //**Block button**//
                    var cc_email_block_btn = document.createElement("BUTTON");
                    // var btn_t1 = document.createTextNode("Block");
                    var icon_c1 = document.createElement("i");
                    icon_c1.setAttribute("class", "fa fa-ban");
                    icon_c1.setAttribute("title", "Blacklist Email");
                    cc_email_block_btn.appendChild(icon_c1);
                    icon_c1.setAttribute("style", "font-size:18px");

                    cc_email_block_btn.onclick = function(e) {
                        fun_Blockmail(e);
                    };
                    // cc_email_block_btn.appendChild(btn_t1);
                    icon_c1.setAttribute("id", remarray[c1] + "_blockemail");
                    cc_email_block_btn.setAttribute("id", remarray[c1] + "_blockemail");
                    cc_email_block_btn.setAttribute("style", "height: 26px;min-width: 24px; font-size: 10px;color: red; margin-top: -8px; margin-left: 5px;align-items: center;display: inline-flex;flex: 0 0 auto; font-weight: 500; justify-content: center; outline: 0;position: relative; text-decoration: none; text-transform: uppercase;transition-duration: .28s;transition-property: box-shadow,transform,opacity;transition-timing-function: cubic-bezier(.4,0,.2,1);vertical-align: middle;white-space: nowrap;border-style: initial;");
                    //**End Block button**//

                    // **Clear button** //
                    var cc_email_clear_btn = document.createElement("BUTTON");
                    // cc_email_clear_btn.appendChild(document.createTextNode("clear"));
                    var icon_c2 = document.createElement("i");
                    icon_c2.setAttribute("class", "fa fa-times-circle-o");
                    icon_c2.setAttribute("title", "Remove Whitelist/Blacklist");
                    cc_email_clear_btn.appendChild(icon_c2);
                    icon_c2.setAttribute("style", "font-size:18px");
                    cc_email_clear_btn.onclick = function(e) {
                        fun_clearmail(e);
                    };

                    icon_c2.setAttribute("id", remarray[c1] + "_clearemail");
                    cc_email_clear_btn.setAttribute("id", remarray[c1] + "_clearemail");
                    cc_email_clear_btn.setAttribute("style", "height: 26px;min-width: 24px; font-size: 10px;color: black; margin-top: -8px; margin-left: 5px;align-items: center;display: inline-flex;flex: 0 0 auto; font-weight: 500; justify-content: center; outline: 0;position: relative; text-decoration: none; text-transform: uppercase;transition-duration: .28s;transition-property: box-shadow,transform,opacity;transition-timing-function: cubic-bezier(.4,0,.2,1);vertical-align: middle;white-space: nowrap;border-style: initial;");

                    // **End Clear button** //
                    container.appendChild(clabel);
                    container.appendChild(ebr2);
                    butn.appendChild(cc_email_allow_btn);
                    butn.appendChild(cc_email_block_btn);
                    butn.appendChild(cc_email_clear_btn);

                }

            }

        }
        //**End Cc email **//

        //***End Emails getting ****//  
        //  console.log("AllMails", AllMails);
        // Domains.push(AllMails);
        console.log("AllMailsDomain", Domains);



        //***Domains getting ****//

        //**Filter Domain **//
        var alldomains = []; //supparate all domains and filter//
        console.log("alldomains", alldomains);
        //  var Domains=AllMails;
        for (var domains in Domains) {
            var domain_from = Domains[domains].split("@");
            //   console.log("domain_from",domain_from[1]);
            alldomains.push(domain_from[1]);
        }

        const AllDomains = [...new Set(alldomains)];
        console.log("AllDomains", AllDomains);

        for (const dom1 in AllDomains) {
            // All_Domain.pop();
            All_Domain.push(AllDomains[dom1])
            console.log("hi")

        }
        for (const d in AllDomains) {
            var dolabel = document.createElement("LABEL");
            dolabel.appendChild(document.createTextNode(AllDomains[d]));
            dolabel.setAttribute("id", AllDomains[d]);
            dolabel.setAttribute("style", "font-size: 12px; align-items: center;display: inline-flex;flex: 0 0 auto; font-weight: 500; justify-content: center; outline: 0;position: relative; text-decoration: none; transition-duration: .28s;transition-property: box-shadow,transform,opacity;transition-timing-function: cubic-bezier(.4,0,.2,1);vertical-align: middle;white-space: nowrap;border-style: initial;");

            //**Allow button**//
            var domain_allow_btn = document.createElement("BUTTON");
            // var bet = document.createTextNode("Allow");

            var icon_d = document.createElement("i");
            icon_d.setAttribute("class", "fa fa-check-circle-o");
            icon_d.setAttribute("title", "Whitelist Domain");
            domain_allow_btn.appendChild(icon_d);
            icon_d.setAttribute("style", "font-size:18px");

            domain_allow_btn.onclick = function(e) {
                domainallow(e);
            };
            icon_d.setAttribute("id", AllDomains[d] + "_allowdomain");
            domain_allow_btn.setAttribute("id", AllDomains[d] + "_allowdomain");
            domain_allow_btn.setAttribute("style", "height: 26px;min-width: 24px; font-size: 10px;color: green; margin-top: -8px; margin-left: 39px;align-items: center;display: inline-flex;flex: 0 0 auto; font-weight: 500; justify-content: center; outline: 0;position: relative; text-decoration: none; text-transform: uppercase;transition-duration: .28s;transition-property: box-shadow,transform,opacity;transition-timing-function: cubic-bezier(.4,0,.2,1);vertical-align: middle;white-space: nowrap;border-style: initial;");

            var ebr5 = document.createElement('br');
            // domain_allow_btn.appendChild(bet);
            //**Allow button end**// 

            //**Block button**//
            var domain_block_btn = document.createElement("BUTTON");
            // var bt_t1 = document.createTextNode("Block");
            var icon_d1 = document.createElement("i");
            icon_d1.setAttribute("class", "fa fa-ban");
            icon_d1.setAttribute("title", "Blacklist Domain");
            domain_block_btn.appendChild(icon_d1);
            icon_d1.setAttribute("style", "font-size:18px");
            domain_block_btn.onclick = function(e) {
                block_domain(e);
            };
            // domain_block_btn.appendChild(bt_t1);
            icon_d1.setAttribute("id", AllDomains[d] + "_blockdomain");
            domain_block_btn.setAttribute("id", AllDomains[d] + "_blockdomain");
            domain_block_btn.setAttribute("style", "height: 26px;min-width: 24px; font-size: 10px;color: red; margin-top: -8px; margin-left: 5px;align-items: center;display: inline-flex;flex: 0 0 auto; font-weight: 500; justify-content: center; outline: 0;position: relative; text-decoration: none; text-transform: uppercase;transition-duration: .28s;transition-property: box-shadow,transform,opacity;transition-timing-function: cubic-bezier(.4,0,.2,1);vertical-align: middle;white-space: nowrap;border-style: initial;");
            //**End Block button**//

            // **Clear button** //
            var domain_clear_btn = document.createElement("BUTTON");
            // domain_clear_btn.appendChild(document.createTextNode("clear"));
            var icon_c2 = document.createElement("i");
            icon_c2.setAttribute("class", "fa fa-times-circle-o");
            domain_clear_btn.appendChild(icon_c2);
            icon_c2.setAttribute("style", "font-size:18px");
            icon_c2.setAttribute("title", "Remove Whitelist/Blacklist");
            domain_clear_btn.onclick = function(e) {
                fun_cleardomain(e);
            };

            icon_c2.setAttribute("id", AllDomains[d] + "_clearemail");
            domain_clear_btn.setAttribute("id", AllDomains[d] + "_clearemail");
            domain_clear_btn.setAttribute("style", "height: 26px;min-width: 24px; font-size: 10px;color: black; margin-top: -8px; margin-left: 5px;align-items: center;display: inline-flex;flex: 0 0 auto; font-weight: 500; justify-content: center; outline: 0;position: relative; text-decoration: none; text-transform: uppercase;transition-duration: .28s;transition-property: box-shadow,transform,opacity;transition-timing-function: cubic-bezier(.4,0,.2,1);vertical-align: middle;white-space: nowrap;border-style: initial;");

            // **End Clear button** //

            var ebr3 = document.createElement('br');
            container.appendChild(dolabel);
            container.appendChild(ebr3);
            butn.appendChild(domain_allow_btn);
            butn.appendChild(domain_block_btn);
            butn.appendChild(domain_clear_btn);

            butn.appendChild(ebr5);

        }
        //**End Filter Domain  **//

        //***End Domains getting ****//


        //** spam list

        AppSDK.dispatch("invokeUrl", {

            xhrObj: {
                "url": "https://mail.zoho.com/api/organization",
                "type": "GET",
                "headers": {
                    "Content-Type": "application/json"
                },
                "serviceName": "SpamMail"
            }

        }).then(function(successResponse) {
            console.log("onload spam info :",successResponse);
            var succ = JSON.stringify(successResponse);
           
            var res = JSON.parse(succ);
            var respon = res.response;
            let rr = JSON.parse(respon);
            var data1 = rr.data;
            var zoid = data1.zoid;
            // console.log("zoid",zoid);
            var status = rr.status;
            var code = status.code;
            console.log("error code[400]:", code);


            //** add whitelist  email **


            AppSDK.dispatch("invokeUrl", {

                xhrObj: {
                    "url": "https://mail.zoho.com/api/organization/" + zoid + "/antispam/data?spamCategory=whiteListEmail&mode=getMarkingData&start=0&limit=500",
                    "type": "GET",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "serviceName": "SpamMail"
                }


            }).then(function(successResponse) {
                   
                    var succ = JSON.stringify(successResponse);
                    // console.log("succ",succ);
                    var res = JSON.parse(succ);
                    var respon = res.response;
                    let rr = JSON.parse(respon);
                    var data2 = rr.data;
                    var whiteListEmail = data2.whiteListEmail;

                    function intersect(a, b) {
                        var setA = new Set(a);
                        var setB = new Set(b);
                        var intersection = new Set([...setA].filter(x => setB.has(x)));
                        return Array.from(intersection);
                    }
                    let result1 = intersect(whiteListEmail, AllMails);

                    for (const em in result1) {

                        var eml = document.getElementById(result1[em]);
                        // console.log("eml", eml);
                        eml.style.color = "green";

                    }

                    // disable and change color button
                    for (const eem in result1) {
                        const button1 = document.getElementById(result1[eem] + "_allowemail");
                        console.log("button1", button1)
                        button1.disabled = true;
                        if (button1.disabled == true) {
                            var All_btn = document.getElementById(result1[eem] + "_allowemail");
                            //  console.log("eml", eml);
                            All_btn.style.color = "grey";
                        }
                    }

                },

                function(errorResponse) {
                    var err = JSON.stringify(errorResponse);
                    console.log("error ", err);

                })


            //**blocklist **//


            AppSDK.dispatch("invokeUrl", {

                xhrObj: {
                    "url": "https://mail.zoho.com/api/organization/" + zoid + "/antispam/data?spamCategory=blackListEmail&mode=getMarkingData&start=0&limit=500",
                    "type": "GET",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "serviceName": "SpamMail"
                }


            }).then(function(successResponse) {
                    // 
                    var succ = JSON.stringify(successResponse);
                    //  console.log("blacklist",succ);
                    var res = JSON.parse(succ);
                    var respon = res.response;
                    let rr = JSON.parse(respon);
                    var data2 = rr.data;
                    var blockListEmail = data2.blackListEmail;
                    // console.log("blackListEmail", blackListEmail);

                    var blockmails = [];

                    //  console.log("blockmails",blockmails)
                    for (var bl in blockListEmail) {
                        var bbl = blockListEmail[bl].email;
                        // console.log("blackListEmail[bl]",bbl)
                        blockmails.push(bbl)
                    }

                    function intersect(a, b) {
                        var setA = new Set(a);
                        var setB = new Set(b);
                        var intersection = new Set([...setA].filter(x => setB.has(x)));
                        return Array.from(intersection);
                    }
                    let result2 = intersect(blockmails, AllMails);
                    // console.log("block_result1",result2);

                    for (const bm in result2) {

                        var bml = document.getElementById(result2[bm]);
                        // console.log("bml", bml);
                        bml.style.color = "red";

                    }

                    for (const bbm in result2) {
                        const button2 = document.getElementById(result2[bbm] + "_blockemail");
                        // console.log("button2",button2);
                        button2.disabled = true;
                        if (button2.disabled == true) {
                            var bl_btn = document.getElementById(result2[bbm] + "_blockemail");
                            //  console.log("bl_btn", bl_btn);
                            bl_btn.style.color = "grey";
                        }
                    }


                },

                function(errorResponse) {
                    var err = JSON.stringify(errorResponse);
                    console.log("error ", err);

                })

            //** end block**//

            //**Domain whitelisted **//

            //**Allow domians**//
            AppSDK.dispatch("invokeUrl", {

                xhrObj: {
                    "url": "https://mail.zoho.com/api/organization/" + zoid + "/antispam/data?spamCategory=whiteListDomain&mode=getMarkingData&start=0&limit=500",
                    "type": "GET",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "serviceName": "SpamMail"
                }


            }).then(function(successResponse) {
                    // 
                    var succ = JSON.stringify(successResponse);
                    //  console.log("whiteListDomains",succ);
                    var res = JSON.parse(succ);
                    var respon = res.response;
                    let rr = JSON.parse(respon);
                    var data2 = rr.data;
                    // console.log("rrrrr",data2)
                    var whiteListDomains = data2.whiteListDomain;
                    // console.log("whiteListDomains", whiteListDomains);

                    //**comapre allow domains and all domains**//
                    function intersect(a, b) {
                        var setA = new Set(a);
                        var setB = new Set(b);
                        var intersection = new Set([...setA].filter(x => setB.has(x)));
                        return Array.from(intersection);
                    }
                    let result_dom_mail = intersect(whiteListDomains, AllDomains);
                    // console.log("result_domain_Allow",result_dom_mail);

                    //**end comapre allow domains and all domains**//

                    // $ show multiple allow domains green$ //
                    for (const dm in result_dom_mail) {

                        var domain_allow = document.getElementById(result_dom_mail[dm]);
                        // console.log("eml", eml);
                        domain_allow.style.color = "green";

                    }
                    // $ End show multiple allow domains green$ //


                    // disable and change color button
                    for (const ddm in result_dom_mail) {
                        const button2 = document.getElementById(result_dom_mail[ddm] + "_allowdomain");
                        // console.log("button1",button1)
                        button2.disabled = true;
                        if (button2.disabled == true) {
                            var All_btn1 = document.getElementById(result_dom_mail[ddm] + "_allowdomain");
                            //  console.log("eml", eml);
                            All_btn1.style.color = "grey";
                            // path.setAttribute("fill", "grey");
                        }

                        //**Domain is allow show the related email green color and block the allow button**//

                        //  console.log("AllMails_____allow_domain",AllMails);

                        for (const kt in result_dom_mail) {
                            for (var jk in AllMails) {
                                var spilt_mail = AllMails[jk].split('@')[1];
                                // console.log("spilt_mail",spilt_mail)


                                if (result_dom_mail[kt] == spilt_mail) {

                                    var domain_allow1 = document.getElementById(AllMails[jk]);
                                    domain_allow1.style.color = "green";
                                    const Do_Allow = document.getElementById(AllMails[jk] + "_allowemail");
                                    //  console.log("Domain_Allow",Do_Allow);
                                    Do_Allow.disabled = true;
                                    if (Do_Allow.disabled == true) {
                                        var All_btn_do_mial = document.getElementById(AllMails[jk] + "_allowemail");
                                        All_btn_do_mial.style.color = "grey";
                                    }

                                }
                            }
                        }

                        //**End Domain is allow show the related email green color and block the allow button **//


                    }

                },

                function(errorResponse) {
                    var err = JSON.stringify(errorResponse);
                    console.log("error ", err);

                })

            //**End Allow domians**//


            //**Block domians**//
            AppSDK.dispatch("invokeUrl", {

                xhrObj: {
                    "url": "https://mail.zoho.com/api/organization/" + zoid + "/antispam/data?spamCategory=blackListDomain&mode=getMarkingData&start=0&limit=500",
                    "type": "GET",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "serviceName": "SpamMail"
                }


            }).then(function(successResponse) {
                    // 
                    var succ = JSON.stringify(successResponse);
                    //  console.log("blockListDomains",succ);
                    var res = JSON.parse(succ);
                    var respon = res.response;
                    let rr = JSON.parse(respon);
                    var data2 = rr.data;
                    //  console.log("rrrrr",data2)
                    var blockListDomains = data2.blackListDomain;

                    var balckdomains = [];
                    // console.log("balckdomains",balckdomains)

                    for (var bdm in blockListDomains) {
                        // console.log("blockListDomains", blockListDomains[bdm].email);
                        balckdomains.push(blockListDomains[bdm].email)
                    }


                    function intersect(a, b) {
                        var setA = new Set(a);
                        var setB = new Set(b);
                        var intersection = new Set([...setA].filter(x => setB.has(x)));
                        return Array.from(intersection);
                    }
                    let result_dom_block = intersect(balckdomains, AllDomains);
                    // console.log("result_domain_block",result_dom_block);


                    for (const db in result_dom_block) {

                        var domain_block = document.getElementById(result_dom_block[db]);
                        // console.log("eml", eml);
                        domain_block.style.color = "red";

                    }
                    // disable and change color button
                    for (const ddb in result_dom_block) {
                        const btn_block = document.getElementById(result_dom_block[ddb] + "_blockdomain");
                        // console.log("button1",button1)
                        btn_block.disabled = true;
                        if (btn_block.disabled == true) {
                            var All_btn2 = document.getElementById(result_dom_block[ddb] + "_blockdomain");
                            //  console.log("eml", eml);
                            All_btn2.style.color = "grey";
                        }

                        //**Domain is block show the related email red color and block the block button**//

                        //  console.log("AllMails_______block domain",AllMails);
                        for (const n in result_dom_block) {
                            for (var kl in AllMails) {
                                var spilt_domain = AllMails[kl].split('@')[1];
                                // console.log("spilt_mail_domain",spilt_domain)

                                if (result_dom_block[n] == spilt_domain) {

                                    //   for(var io in result_dom_block){
                                    var domain_block = document.getElementById(AllMails[kl]);
                                    domain_block.style.color = "red";
                                    const Do_Block = document.getElementById(AllMails[kl] + "_blockemail");
                                    //  console.log("Domain_Block",Do_Block)
                                    Do_Block.disabled = true;

                                    if (Do_Block.disabled == true) {
                                        var All_btn_do_block = document.getElementById(AllMails[kl] + "_blockemail");
                                        //  console.log("eml", eml);
                                        All_btn_do_block.style.color = "gray";
                                        // }
                                    }
                                }
                            }

                        }
                        //**End Domain is block show the related email red color and block the block button **//

                    }

                },

                function(errorResponse) {
                    var err = JSON.stringify(errorResponse);
                    console.log("error ", err);

                })

            //**End Block domians**//

            //** end Domain whitelisted**//

        },
        
        function(errorResponse) {
        var err = JSON.stringify(errorResponse);
        console.log("error ", err);
         var res = JSON.parse(err);
         var error_code =res.status;
            console.log("error responce",error_code); 
            // @ Server error alert @ //
            if(error_code==400){
              document.getElementById("Alert").style.display = "block";
            }
            // @ End Server error alert @ //
            });


        populateMailDetails(mailInfo);
    });
});

// @ email allow button @ //

var split_email_l = [];
// console.log("split_email_l",split_email_l)
// console.log("split_email_block",split_email_block)
function emailallow() {
    var Allow_mail = event.srcElement.id;
    console.log("allow mail_icon:", Allow_mail);
    split_email_l.pop();
    const split_Allow_mail = Allow_mail.split('_');
    console.log("split_Allow_mail", split_Allow_mail[0])
    split_email_l.push(split_Allow_mail[0])


    console.log("split_email_l", split_email_l)
    // **Get organization id** //

    AppSDK.dispatch("invokeUrl", {

        xhrObj: {
            "url": "https://mail.zoho.com/api/organization",
            "type": "GET",
            "headers": {
                "Content-Type": "application/json"
            },
            "serviceName": "SpamMail"
        }

    }).then(function(successResponse) {
        var succ = JSON.stringify(successResponse);
        console.log("Success emailallow:",successResponse);
        var res = JSON.parse(succ);
        var respon = res.response;
        let rr = JSON.parse(respon);
        var data1 = rr.data;
        var zoid = data1.zoid;
        console.log("get whitlist zoid", zoid);
        var status = rr.status;
        var code = status.code;

        //** add whitelist  email **

        AppSDK.dispatch("invokeUrl", {

            xhrObj: {
                "url": "https://mail.zoho.com/api/organization/" + zoid,
                "type": "PUT",
                "headers": {
                    "Content-Type": "application/json"
                },
                "payload": {
                    "zoid": zoid,
                    "mode": "addSpamCategory",
                    "spamVO": {
                        "spamCategory": "whiteListEmail",
                        "whiteListEmail": split_email_l
                    }
                },

                "serviceName": "SpamMail"
            }


        }).then(function(successResponse) {
                // 

                var suc = JSON.stringify(successResponse);
                console.log(suc);
                var par = JSON.parse(suc);
                var responce = par.response;
                let rr1 = JSON.parse(responce);
                // console.log("responce",rr1)
                var status1 = rr1.status;
                var code = status1.code;
                console.log("code", code);
                if (code == 200) {
                    var Al_mail = document.getElementById(split_Allow_mail[0]);
                    // console.log("eml", eml);
                    Al_mail.style.color = "green";

                    const button1 = document.getElementById(split_Allow_mail[0] + "_allowemail");
                    console.log("button1", button1)
                    button1.disabled = true;
                    if (button1.disabled == true) {
                        var All_btn = document.getElementById(split_Allow_mail[0] + "_allowemail");
                        //  console.log("eml", eml);
                        All_btn.style.color = "grey";
                    }

                }

                if (code == 500) {

                    //**  remove emails from blackListEmail   **
                    AppSDK.dispatch("invokeUrl", {

                        xhrObj: {
                            "url": "https://mail.zoho.com/api/organization/" + zoid,
                            "type": "PUT",
                            "headers": {
                                "Content-Type": "application/json"
                            },
                            "payload": {
                                "zoid": zoid,
                                "mode": "removeSpamCategory",
                                "spamVO": {
                                    "spamCategory": "blackListEmail",
                                    "blackListEmail": split_email_l
                                }
                            },

                            "serviceName": "SpamMail"
                        }


                    }).then(function(successResponse) {

                            var suc = JSON.stringify(successResponse);
                            // console.log("remove block ",suc);
                            var par = JSON.parse(suc);
                            var responce = par.response;
                            let rr1 = JSON.parse(responce);
                            console.log("remove whitlist responce", rr1)
                            var status1 = rr1.status;
                            var code = status1.code;
                            console.log("blacklist remove code", code)


                            if (code == 200) {

                                AppSDK.dispatch("invokeUrl", {

                                    xhrObj: {
                                        "url": "https://mail.zoho.com/api/organization/" + zoid,
                                        "type": "PUT",
                                        "headers": {
                                            "Content-Type": "application/json"
                                        },
                                        "payload": {
                                            "zoid": zoid,
                                            "mode": "addSpamCategory",
                                            "spamVO": {
                                                "spamCategory": "whiteListEmail",
                                                "whiteListEmail": split_email_l
                                            }
                                        },

                                        "serviceName": "SpamMail"
                                    }

                                }).then(function(successResponse) {
                                    // 

                                    var suc = JSON.stringify(successResponse);
                                    console.log(suc);
                                    var par = JSON.parse(suc);
                                    var responce = par.response;
                                    let rr1 = JSON.parse(responce);
                                    // console.log("responce",rr1)
                                    var status1 = rr1.status;
                                    var code = status1.code;
                                    console.log("code", code);
                                    if (code == 200) {
                                        var Al_mail = document.getElementById(split_Allow_mail[0]);
                                        // console.log("eml", eml);
                                        Al_mail.style.color = "green";

                                        const button2 = document.getElementById(split_Allow_mail[0] + "_blockemail");
                                        //   console.log("button1",button1)
                                        button2.disabled = false;
                                        if (button2.disabled == false) {
                                            var All_btn1 = document.getElementById(split_Allow_mail[0] + "_blockemail");
                                            //  console.log("eml", eml);
                                            All_btn1.style.color = "red";
                                        }

                                        const button1 = document.getElementById(split_Allow_mail[0] + "_allowemail");
                                        console.log("button1", button1)
                                        button1.disabled = true;
                                        if (button1.disabled == true) {
                                            var All_btn = document.getElementById(split_Allow_mail[0] + "_allowemail");
                                            //  console.log("eml", eml);
                                            All_btn.style.color = "grey";
                                        }

                                    }
                                })

                            }


                        },
                        function(errorResponse) {
                            var err = JSON.stringify(errorResponse);
                            console.log("error ", err);

                        }
                    )


                    //*end remove email from blackListEmail*//
                }

            },
            function(errorResponse) {
                var err = JSON.stringify(errorResponse);
                console.log("error ", err);

            }
        )


        //**end whitelist email**//
    },
     function(errorResponse) {
        var err = JSON.stringify(errorResponse);
        console.log("error ", err);
         var res = JSON.parse(err);
         var error_code =res.status;
            console.log("error responce",error_code); 
            // @ Server error alert @ //
            if(error_code==400){
              document.getElementById("Alert").style.display = "block";
            }
            // @ End Server error alert @ //
            });


}

// @ End email allow button @ //

//** block mail **//
var split_email_block = [];
// console.log("split_email_block",split_email_block)
function fun_Blockmail() {
    var Block_mail = event.srcElement.id;
    split_email_block.pop();
    const split_Block_mail = Block_mail.split('_');
    console.log("split_Block_mail", split_Block_mail[0])
    split_email_block.push(split_Block_mail[0])

    console.log("split_email_block", split_email_block)
    // **Get organization id** //

    AppSDK.dispatch("invokeUrl", {

        xhrObj: {
            "url": "https://mail.zoho.com/api/organization",
            "type": "GET",
            "headers": {
                "Content-Type": "application/json"
            },
            "serviceName": "SpamMail"
        }

    }).then(function(successResponse) {
        var succ = JSON.stringify(successResponse);
        // console.log(succ);
        var res = JSON.parse(succ);
        var respon = res.response;
        let rr = JSON.parse(respon);
        var data1 = rr.data;
        var zoid = data1.zoid;
        console.log("get whitlist zoid", zoid);
        var status = rr.status;
        var code = status.code;

        //** add blocklist  email **

        AppSDK.dispatch("invokeUrl", {

            xhrObj: {
                "url": "https://mail.zoho.com/api/organization/" + zoid,
                "type": "PUT",
                "headers": {
                    "Content-Type": "application/json"
                },
                "payload": {
                    "zoid": zoid,
                    "mode": "addSpamCategory",
                    "spamVO": {
                        "spamCategory": "blackListEmail",
                        "blackListEmail": split_email_block
                    }
                },

                "serviceName": "SpamMail"
            }


        }).then(function(successResponse) {
                // 

                var suc = JSON.stringify(successResponse);
                console.log(suc);
                var par = JSON.parse(suc);
                var responce = par.response;
                let rr1 = JSON.parse(responce);
                //  console.log("Block responce",rr1)
                var status1 = rr1.status;
                var code = status1.code;
                console.log("code", code);

                if (code == 200) {
                    var Bl_mail = document.getElementById(split_Block_mail[0]);
                    // console.log("eml", eml);
                    Bl_mail.style.color = "red";

                    const button2 = document.getElementById(split_Block_mail[0] + "_blockemail");
                    console.log("button2", button2)
                    button2.disabled = true;
                    if (button2.disabled == true) {
                        var Bll_btn = document.getElementById(split_Block_mail[0] + "_blockemail");
                        //  console.log("eml", eml);
                        Bll_btn.style.color = "grey";
                    }

                }

                if (code == 500) {

                    //**  remove emails from whiteListEmail   **
                    AppSDK.dispatch("invokeUrl", {

                        xhrObj: {
                            "url": "https://mail.zoho.com/api/organization/" + zoid,
                            "type": "PUT",
                            "headers": {
                                "Content-Type": "application/json"
                            },
                            "payload": {
                                "zoid": zoid,
                                "mode": "removeSpamCategory",
                                "spamVO": {
                                    "spamCategory": "whiteListEmail",
                                    "whiteListEmail": split_email_block
                                }
                            },

                            "serviceName": "SpamMail"
                        }


                    }).then(function(successResponse) {

                            var suc = JSON.stringify(successResponse);
                            // console.log("remove block ",suc);
                            var par = JSON.parse(suc);
                            var responce = par.response;
                            let rr1 = JSON.parse(responce);
                            console.log("remove whitlist responce", rr1)
                            var status1 = rr1.status;
                            var code = status1.code;
                            console.log("remove whitelist code", code)

                            if (code == 200) {

                                AppSDK.dispatch("invokeUrl", {

                                    xhrObj: {
                                        "url": "https://mail.zoho.com/api/organization/" + zoid,
                                        "type": "PUT",
                                        "headers": {
                                            "Content-Type": "application/json"
                                        },
                                        "payload": {
                                            "zoid": zoid,
                                            "mode": "addSpamCategory",
                                            "spamVO": {
                                                "spamCategory": "blackListEmail",
                                                "blackListEmail": split_email_block
                                            }
                                        },

                                        "serviceName": "SpamMail"
                                    }


                                }).then(function(successResponse) {
                                    // 

                                    var suc = JSON.stringify(successResponse);
                                    console.log(suc);
                                    var par = JSON.parse(suc);
                                    var responce = par.response;
                                    let rr1 = JSON.parse(responce);
                                    //  console.log("Block responce",rr1)
                                    var status1 = rr1.status;
                                    var code = status1.code;
                                    console.log("code", code);

                                    if (code == 200) {
                                        var Bl_mail = document.getElementById(split_Block_mail[0]);
                                        // console.log("eml", eml);
                                        Bl_mail.style.color = "red";

                                        const button1 = document.getElementById(split_Block_mail[0] + "_allowemail");
                                        //   console.log("button1",button1)
                                        button1.disabled = false;
                                        if (button1.disabled == false) {
                                            var Bll_btn1 = document.getElementById(split_Block_mail[0] + "_allowemail");
                                            //  console.log("eml", eml);
                                            Bll_btn1.style.color = "green";
                                        }
                                        const button2 = document.getElementById(split_Block_mail[0] + "_blockemail");
                                        console.log("button2", button2)
                                        button2.disabled = true;
                                        if (button2.disabled == true) {
                                            var Bll_btn = document.getElementById(split_Block_mail[0] + "_blockemail");
                                            //  console.log("eml", eml);
                                            Bll_btn.style.color = "grey";
                                        }

                                    }

                                })

                            }


                        },
                        function(errorResponse) {
                            var err = JSON.stringify(errorResponse);
                            console.log("error ", err);

                        }
                    )


                    //*end remove email from whiteListEmail*//
                }

            },
            function(errorResponse) {
                var err = JSON.stringify(errorResponse);
                console.log("error ", err);

            }
        )


        //**end blocklist email**//
    },
     function(errorResponse) {
        var err = JSON.stringify(errorResponse);
        console.log("error ", err);
         var res = JSON.parse(err);
         var error_code =res.status;
            console.log("error responce",error_code); 
           // @ Server error alert @ //
            if(error_code==400){
              document.getElementById("Alert").style.display = "block";
            }
            // @ End Server error alert @ //
            });

}

//** End block mail **//


//--   --   --  --  -//


//*Allow Domain*//

var split_domain_l = [];

function domainallow() {
    // All_Domain.pop();
    console.log("hi_All_Domain", All_Domain)
    // console.log("AllMails", AllMails);
    // console.log("All_Split_Domain:", split_domain_l)
    var Allow_Domain = event.srcElement.id;
    split_domain_l.pop();
    console.log("Block_maill:", Allow_Domain)
    const split_Allow_Domain = Allow_Domain.split('_');
    console.log("split_Block_mail:", split_Allow_Domain[0])
    split_domain_l.push(split_Allow_Domain[0]);

    // **Get organization id** //

    AppSDK.dispatch("invokeUrl", {

        xhrObj: {
            "url": "https://mail.zoho.com/api/organization",
            "type": "GET",
            "headers": {
                "Content-Type": "application/json"
            },
            "serviceName": "SpamMail"
        }

    }).then(function(successResponse) {
        var succ = JSON.stringify(successResponse);
        // console.log(succ);
        var res = JSON.parse(succ);
        var respon = res.response;
        let rr = JSON.parse(respon);
        var data1 = rr.data;
        var zoid = data1.zoid;
        console.log("get whitlist zoid", zoid);
        var status = rr.status;
        var code = status.code;

        //** add whitelist  Domain **

        AppSDK.dispatch("invokeUrl", {

            xhrObj: {
                "url": "https://mail.zoho.com/api/organization/" + zoid,
                "type": "PUT",
                "headers": {
                    "Content-Type": "application/json"
                },
                "payload": {
                    "zoid": zoid,
                    "mode": "addSpamCategory",
                    "spamVO": {
                        "spamCategory": "whiteListDomain",
                        "whiteListDomain": split_domain_l
                    }
                },

                "serviceName": "SpamMail"
            }


        }).then(function(successResponse) {
                // 

                var suc = JSON.stringify(successResponse);
                console.log(suc);
                var par = JSON.parse(suc);
                var responce = par.response;
                let rr1 = JSON.parse(responce);
                // console.log("responce",rr1)
                var status1 = rr1.status;
                var code = status1.code;
                console.log("code", code);
                if (code == 200) {
                    var Al_mail = document.getElementById(split_Allow_Domain[0]);
                    // console.log("eml", eml);
                    Al_mail.style.color = "green";

                    const button1 = document.getElementById(split_Allow_Domain[0] + "_allowdomain");
                    console.log("button1", button1)
                    button1.disabled = true;
                    if (button1.disabled == true) {
                        var All_btn = document.getElementById(split_Allow_Domain[0] + "_allowdomain");
                        //  console.log("eml", eml);
                        All_btn.style.color = "grey";
                    }

                    // ** allow respective mail if the domain is allow** //


                    AppSDK.dispatch("invokeUrl", {

                        xhrObj: {
                            "url": "https://mail.zoho.com/api/organization/" + zoid + "/antispam/data?spamCategory=whiteListDomain&mode=getMarkingData&start=0&limit=500",
                            "type": "GET",
                            "headers": {
                                "Content-Type": "application/json"
                            },
                            "serviceName": "SpamMail"
                        }


                    }).then(function(successResponse) {
                            // 
                            var succ = JSON.stringify(successResponse);
                            //  console.log("whiteListDomains",succ);
                            var res = JSON.parse(succ);
                            var respon = res.response;
                            let rr = JSON.parse(respon);
                            var data2 = rr.data;
                            // console.log("rrrrr",data2)
                            var whiteListDomains = data2.whiteListDomain;
                            // console.log("whiteListDomains", whiteListDomains);


                            // //**comapre allow domains and all domains**//
                            function intersect(a, b) {
                                var setA = new Set(a);
                                var setB = new Set(b);
                                var intersection = new Set([...setA].filter(x => setB.has(x)));
                                return Array.from(intersection);
                            }
                            let result_dom_mail = intersect(whiteListDomains, split_domain_l);
                            console.log("result_domain_Allow##", result_dom_mail);

                            // **end comapre allow domains and all domains**//

                            // $ show multiple allow domains green$ //
                            for (const dm in result_dom_mail) {

                                var domain_allow = document.getElementById(result_dom_mail[dm]);
                                // console.log("eml", eml);
                                domain_allow.style.color = "green";

                            }
                            // $ End show multiple allow domains green$ //


                            // disable and change color button
                            for (const ddm in result_dom_mail) {
                                const button2 = document.getElementById(result_dom_mail[ddm] + "_allowdomain");
                                // console.log("button1",button1)
                                button2.disabled = true;
                                if (button2.disabled == true) {
                                    var All_btn1 = document.getElementById(result_dom_mail[ddm] + "_allowdomain");
                                    //  console.log("eml", eml);
                                    All_btn1.style.color = "grey";
                                    // path.setAttribute("fill", "grey");
                                }

                                //**Domain is allow show the related email green color and block the allow button**//

                                //  console.log("AllMails_____allow_domain",AllMails);

                                for (const kt in result_dom_mail) {
                                    for (var jk in AllMails) {
                                        var spilt_mail = AllMails[jk].split('@')[1];
                                        // console.log("spilt_mail",spilt_mail)


                                        if (result_dom_mail[kt] == spilt_mail) {

                                            var domain_allow1 = document.getElementById(AllMails[jk]);
                                            domain_allow1.style.color = "green";
                                            const Do_Allow = document.getElementById(AllMails[jk] + "_allowemail");
                                            //  console.log("Domain_Allow",Do_Allow);
                                            Do_Allow.disabled = true;
                                            if (Do_Allow.disabled == true) {
                                                var All_btn_do_mial = document.getElementById(AllMails[jk] + "_allowemail");
                                                All_btn_do_mial.style.color = "grey";
                                            }

                                        }
                                    }
                                }

                                //**End Domain is allow show the related email green color and block the allow button **//


                            }

                        },

                        function(errorResponse) {
                            var err = JSON.stringify(errorResponse);
                            console.log("error ", err);

                        })

                    // **End allow respective mail if the domain is allow** //

                }

                if (code == 500) {

                    //**  remove emails from blackList Domain   **
                    AppSDK.dispatch("invokeUrl", {

                        xhrObj: {
                            "url": "https://mail.zoho.com/api/organization/" + zoid,
                            "type": "PUT",
                            "headers": {
                                "Content-Type": "application/json"
                            },
                            "payload": {
                                "zoid": zoid,
                                "mode": "removeSpamCategory",
                                "spamVO": {
                                    "spamCategory": "blackListDomain",
                                    "blackListDomain": split_domain_l
                                }
                            },

                            "serviceName": "SpamMail"
                        }


                    }).then(function(successResponse) {

                            var suc = JSON.stringify(successResponse);
                            // console.log("remove block ",suc);
                            var par = JSON.parse(suc);
                            var responce = par.response;
                            let rr1 = JSON.parse(responce);
                            console.log("remove whitlist domain responce", rr1)
                            var status1 = rr1.status;
                            var code = status1.code;
                            console.log("blacklist domain remove code", code)


                            if (code == 200) {

                                AppSDK.dispatch("invokeUrl", {

                                    xhrObj: {
                                        "url": "https://mail.zoho.com/api/organization/" + zoid,
                                        "type": "PUT",
                                        "headers": {
                                            "Content-Type": "application/json"
                                        },
                                        "payload": {
                                            "zoid": zoid,
                                            "mode": "addSpamCategory",
                                            "spamVO": {
                                                "spamCategory": "whiteListDomain",
                                                "whiteListDomain": split_domain_l
                                            }
                                        },

                                        "serviceName": "SpamMail"
                                    }

                                }).then(function(successResponse) {
                                    // 

                                    var suc = JSON.stringify(successResponse);
                                    console.log(suc);
                                    var par = JSON.parse(suc);
                                    var responce = par.response;
                                    let rr1 = JSON.parse(responce);
                                    // console.log("responce",rr1)
                                    var status1 = rr1.status;
                                    var code = status1.code;
                                    console.log("code", code);

                                    if (code == 200) {
                                        var Al_dom = document.getElementById(split_Allow_Domain[0]);
                                        Al_dom.style.color = "green";

                                        const button2 = document.getElementById(split_Allow_Domain[0] + "_blockdomain");
                                        button2.disabled = false;
                                        if (button2.disabled == false) {
                                            var All_btn1 = document.getElementById(split_Allow_Domain[0] + "_blockdomain");
                                            //  console.log("eml", eml);
                                            All_btn1.style.color = "red";
                                        }

                                        const button1 = document.getElementById(split_Allow_Domain[0] + "_allowdomain");
                                        console.log("button1", button1)
                                        button1.disabled = true;
                                        if (button1.disabled == true) {
                                            var All_btn = document.getElementById(split_Allow_Domain[0] + "_allowdomain");
                                            All_btn.style.color = "grey";
                                        }


                                        const All_Mails = [...new Set(AllMails)];
                                        console.log("All_Mails", All_Mails);
                                        for (var tt in All_Domain) {
                                            for (var jk in split_Allow_Domain) {
                                                for (var i in All_Mails) {
                                                    var Mails_block = All_Mails[i].split("@");
                                                    if (split_Allow_Domain[jk] == Mails_block[1]) {
                                                        console.log("You can change the color");
                                                        var Bl_mail1 = document.getElementById(All_Mails[i]);
                                                        Bl_mail1.style.color = "green";
                                                        var btn_allow = document.getElementById(All_Mails[i] + "_blockemail");
                                                        btn_allow.disabled = false;
                                                        if (btn_allow.disabled == false) {
                                                            var All_btn3 = document.getElementById(All_Mails[i] + "_blockemail");
                                                            All_btn3.style.color = "red";
                                                        }
                                                        console.log(All_Mails[i], "_blockemail")
                                                        const button3 = document.getElementById(All_Mails[i] + "_allowemail");
                                                        console.log("button3", button3)
                                                        button3.disabled = true;
                                                        if (button3.disabled == true) {
                                                            var Bll_btn = document.getElementById(All_Mails[i] + "_allowemail");
                                                            Bll_btn.style.color = "grey";
                                                        }
                                                    }

                                                }
                                            }
                                        }
                                    }
                                })

                            }


                        },
                        function(errorResponse) {
                            var err = JSON.stringify(errorResponse);
                            console.log("error ", err);

                        }
                    )


                    //*end remove email from blackListEmail*//
                }

            },
            function(errorResponse) {
                var err = JSON.stringify(errorResponse);
                console.log("error ", err);

            }
        )


        //**end whitelist Domain**//
    },
     function(errorResponse) {
        var err = JSON.stringify(errorResponse);
        console.log("error ", err);
         var res = JSON.parse(err);
         var error_code =res.status;
            console.log("error responce",error_code); 
           // @ Server error alert @ //
            if(error_code==400){
              document.getElementById("Alert").style.display = "block";
            }
            // @ End Server error alert @ //
            });

}
//*End Allow Domain*//

//*Block Domain*//

var split_domain_block = [];

function block_domain() {
    var Block_domain = event.srcElement.id;
    split_domain_block.pop();
    const split_Block_domain = Block_domain.split('_');
    console.log("split_Block_mail", split_Block_domain[0])
    split_domain_block.push(split_Block_domain[0])

    console.log("split_Block_domain", split_domain_block)
    // **Get organization id** //

    AppSDK.dispatch("invokeUrl", {

        xhrObj: {
            "url": "https://mail.zoho.com/api/organization",
            "type": "GET",
            "headers": {
                "Content-Type": "application/json"
            },
            "serviceName": "SpamMail"
        }

    }).then(function(successResponse) {
        var succ = JSON.stringify(successResponse);
        // console.log(succ);
        var res = JSON.parse(succ);
        var respon = res.response;
        let rr = JSON.parse(respon);
        var data1 = rr.data;
        var zoid = data1.zoid;
        console.log("get blocklist domain zoid", zoid);
        var status = rr.status;
        var code = status.code;

        //** add blocklist  domain **

        AppSDK.dispatch("invokeUrl", {

            xhrObj: {
                "url": "https://mail.zoho.com/api/organization/" + zoid,
                "type": "PUT",
                "headers": {
                    "Content-Type": "application/json"
                },
                "payload": {
                    "zoid": zoid,
                    "mode": "addSpamCategory",
                    "spamVO": {
                        "spamCategory": "blackListDomain",
                        "blackListDomain": split_domain_block
                    }
                },

                "serviceName": "SpamMail"
            }


        }).then(function(successResponse) {
                // 

                var suc = JSON.stringify(successResponse);
                console.log(suc);
                var par = JSON.parse(suc);
                var responce = par.response;
                let rr1 = JSON.parse(responce);
                //  console.log("Block responce",rr1)
                var status1 = rr1.status;
                var code = status1.code;
                console.log("code", code);

                if (code == 200) {
                    var Bl_domain = document.getElementById(split_Block_domain[0]);
                    // console.log("eml", eml);
                    Bl_domain.style.color = "red";

                    const button2 = document.getElementById(split_Block_domain[0] + "_blockdomain");
                    console.log("button2", button2)
                    button2.disabled = true;
                    if (button2.disabled == true) {
                        var Bll_btn = document.getElementById(split_Block_domain[0] + "_blockdomain");
                        //  console.log("eml", eml);
                        Bll_btn.style.color = "grey";
                    }

                    // **Change mail color when block the demain** //
                    AppSDK.dispatch("invokeUrl", {

                        xhrObj: {
                            "url": "https://mail.zoho.com/api/organization/" + zoid + "/antispam/data?spamCategory=blackListDomain&mode=getMarkingData&start=0&limit=500",
                            "type": "GET",
                            "headers": {
                                "Content-Type": "application/json"
                            },
                            "serviceName": "SpamMail"
                        }


                    }).then(function(successResponse) {
                            // 
                            var succ = JSON.stringify(successResponse);
                            //  console.log("blockListDomains",succ);
                            var res = JSON.parse(succ);
                            var respon = res.response;
                            let rr = JSON.parse(respon);
                            var data2 = rr.data;
                            //  console.log("rrrrr",data2)
                            var blockListDomains = data2.blackListDomain;

                            var balckdomains = [];
                            // console.log("balckdomains",balckdomains)

                            for (var bdm in blockListDomains) {
                                // console.log("blockListDomains", blockListDomains[bdm].email);
                                balckdomains.push(blockListDomains[bdm].email)
                            }


                            function intersect(a, b) {
                                var setA = new Set(a);
                                var setB = new Set(b);
                                var intersection = new Set([...setA].filter(x => setB.has(x)));
                                return Array.from(intersection);
                            }
                            let result_dom_block = intersect(balckdomains, split_Block_domain);
                            // console.log("result_domain_block--%%",result_dom_block);


                            for (const db in result_dom_block) {

                                var domain_block = document.getElementById(result_dom_block[db]);
                                // console.log("eml", eml);
                                domain_block.style.color = "red";

                            }
                            // disable and change color button
                            for (const ddb in result_dom_block) {
                                const btn_block = document.getElementById(result_dom_block[ddb] + "_blockdomain");
                                btn_block.disabled = true;

                                if (btn_block.disabled == true) {
                                    var All_btn2 = document.getElementById(result_dom_block[ddb] + "_blockdomain");
                                    //  console.log("eml", eml);
                                    All_btn2.style.color = "grey";

                                }


                                //**Domain is block show the related email red color and block the block button**//

                                //  console.log("AllMails_______block domain",AllMails);
                                for (const n in result_dom_block) {
                                    for (var kl in AllMails) {
                                        var spilt_domain = AllMails[kl].split('@')[1]
                                        // console.log("spilt_mail_domain",spilt_domain)

                                        if (result_dom_block[n] == spilt_domain) {


                                            var domain_block = document.getElementById(AllMails[kl]);
                                            domain_block.style.color = "red";
                                            const Do_Block = document.getElementById(AllMails[kl] + "_blockemail");
                                            Do_Block.disabled = true;
                                            var btn_allow = document.getElementById(AllMails[kl] + "_allowemail");
                                            btn_allow.disabled = true;
                                            if (Do_Block.disabled == true) {
                                                var All_btn_do_block = document.getElementById(AllMails[kl] + "_blockemail");
                                                All_btn_do_block.style.color = "gray";
                                                console.log("All_btn_do_block", All_btn_do_block)
                                                var All_btn3 = document.getElementById(AllMails[kl] + "_allowemail");
                                                All_btn3.style.color = "gray";
                                            }
                                            
                                        }
                                    }

                                }



                                //**End Domain is block show the related email red color and block the block button **//

                            }

                        },

                        function(errorResponse) {
                            var err = JSON.stringify(errorResponse);
                            console.log("error ", err);

                        })

                    // **Change mail color when block the demain** //

                }

                if (code == 500) {

                    //**  remove emails from whiteListEmail   **
                    AppSDK.dispatch("invokeUrl", {

                        xhrObj: {
                            "url": "https://mail.zoho.com/api/organization/" + zoid,
                            "type": "PUT",
                            "headers": {
                                "Content-Type": "application/json"
                            },
                            "payload": {
                                "zoid": zoid,
                                "mode": "removeSpamCategory",
                                "spamVO": {
                                    "spamCategory": "whiteListDomain",
                                    "whiteListDomain": split_domain_block
                                }
                            },

                            "serviceName": "SpamMail"
                        }


                    }).then(function(successResponse) {

                            var suc = JSON.stringify(successResponse);
                            var par = JSON.parse(suc);
                            var responce = par.response;
                            let rr1 = JSON.parse(responce);
                            console.log("remove blocklist domain responce", rr1)
                            var status1 = rr1.status;
                            var code = status1.code;
                            console.log("remove blocklist domain code", code)

                            if (code == 200) {

                                AppSDK.dispatch("invokeUrl", {

                                    xhrObj: {
                                        "url": "https://mail.zoho.com/api/organization/" + zoid,
                                        "type": "PUT",
                                        "headers": {
                                            "Content-Type": "application/json"
                                        },
                                        "payload": {
                                            "zoid": zoid,
                                            "mode": "addSpamCategory",
                                            "spamVO": {
                                                "spamCategory": "blackListDomain",
                                                "blackListDomain": split_domain_block
                                            }
                                        },

                                        "serviceName": "SpamMail"
                                    }


                                }).then(function(successResponse) {
                                    // 

                                    var suc = JSON.stringify(successResponse);
                                    console.log(suc);
                                    var par = JSON.parse(suc);
                                    var responce = par.response;
                                    let rr1 = JSON.parse(responce);
                                    //  console.log("Block responce",rr1)
                                    var status1 = rr1.status;
                                    var code = status1.code;
                                    console.log("code", code);

                                    if (code == 200) {
                                        var Bl_mail = document.getElementById(split_Block_domain[0]);
                                        // console.log("eml", eml);
                                        Bl_mail.style.color = "red";

                                        const button1 = document.getElementById(split_Block_domain[0] + "_allowdomain");
                                        //   console.log("button1",button1)
                                        button1.disabled = false;
                                        if (button1.disabled == false) {
                                            var Bll_btn1 = document.getElementById(split_Block_domain[0] + "_allowdomain");
                                            Bll_btn1.style.color = "green";
                                        }
                                        const button2 = document.getElementById(split_Block_domain[0] + "_blockdomain");
                                        console.log("button2", button2)
                                        button2.disabled = true;

                                        if (button2.disabled == true) {
                                            var Bll_btn = document.getElementById(split_Block_domain[0] + "_blockdomain");
                                            Bll_btn.style.color = "grey";

                                            const All_Mails = [...new Set(AllMails)];
                                            console.log("All_Mails", All_Mails);
                                            for (var tt in All_Domain) {
                                                for (var jk in split_domain_block) {
                                                    for (var i in All_Mails) {
                                                        var Mails_block = All_Mails[i].split("@");
                                                        if (split_domain_block[jk] == Mails_block[1]) {
                                                            console.log("You can change the color");
                                                            var Bl_mail1 = document.getElementById(All_Mails[i]);
                                                            Bl_mail1.style.color = "red";
                                                            var btn_allow = document.getElementById(All_Mails[i] + "_allowemail");
                                                            btn_allow.disabled = false;
                                                            if (btn_allow.disabled == false) {
                                                                var All_btn3 = document.getElementById(All_Mails[i] + "_allowemail");
                                                                All_btn3.style.color = "green";
                                                            }
                                                            // console.log(All_Mails[i],"_allowemail")
                                                            const button3 = document.getElementById(All_Mails[i] + "_blockemail");
                                                            console.log("button3", button3)
                                                            button3.disabled = true;
                                                             var btn_allow = document.getElementById(AllMails[i] + "_allowemail");
                                                             btn_allow.disabled = true;
                                                            if (button3.disabled == true) {
                                                                var Bll_btn = document.getElementById(All_Mails[i] + "_blockemail");
                                                                Bll_btn.style.color = "grey";
                                                                // var All_btn3 = document.getElementById(AllMails[i] + "_allowemail");
                                                                btn_allow.style.color = "gray";
                                                            }
                                                        }

                                                    }
                                                }

                                            }
                                        }

                                    }

                                })

                            }


                        },
                        function(errorResponse) {
                            var err = JSON.stringify(errorResponse);
                            console.log("error ", err);

                        }
                    )


                    //*end remove email from whiteListEmail*//
                }


            },
            function(errorResponse) {
                var err = JSON.stringify(errorResponse);
                console.log("error ", err);

            }
        )


        //**end blocklist domain**//
    },
    function(errorResponse) {
        var err = JSON.stringify(errorResponse);
           var err = JSON.stringify(errorResponse);
        console.log("error ", err);
         var res = JSON.parse(err);
         var error_code =res.status;
            console.log("error responce",error_code); 
           // @ Server error alert @ //
            if(error_code==400){
              document.getElementById("Alert").style.display = "block";
            }
            // @ End Server error alert @ //

                }
                );
}
//*End Block Domain*//

// **Clear email from Blocklist and Whitelist ** //
var split_email_clear = [];

function fun_clearmail() {
    console.log("Clear mails");
    var clear_mail = event.srcElement.id;
    console.log("clear All_mail", clear_mail)
    split_email_clear.pop();
    const split_clear_mail = clear_mail.split('_');
    // console.log("split_Block_mail", split_clear_mail[0])
    split_email_clear.push(split_clear_mail[0])
    console.log("split_email_clear", split_email_clear)


    // Check spam info

    AppSDK.dispatch("invokeUrl", {

        xhrObj: {
            "url": "https://mail.zoho.com/api/organization",
            "type": "GET",
            "headers": {
                "Content-Type": "application/json"
            },
            "serviceName": "SpamMail"
        }

    }).then(function(successResponse) {
        var succ = JSON.stringify(successResponse);
        // console.log(succ);
        var res = JSON.parse(succ);
        var respon = res.response;
        let rr = JSON.parse(respon);
        var data1 = rr.data;
        var zoid = data1.zoid;
        console.log("zoid", zoid);
        var status = rr.status;
        var code = status.code;
        // console.log("404 code:", code);


        //** check whitelist and remove **//


        AppSDK.dispatch("invokeUrl", {

            xhrObj: {
                "url": "https://mail.zoho.com/api/organization/" + zoid + "/antispam/data?spamCategory=whiteListEmail&mode=getMarkingData&start=0&limit=500",
                "type": "GET",
                "headers": {
                    "Content-Type": "application/json"
                },
                "serviceName": "SpamMail"
            }


        }).then(function(successResponse) {
                var succ = JSON.stringify(successResponse);
                // console.log("succ",succ);
                var res = JSON.parse(succ);
                var respon = res.response;
                let rr = JSON.parse(respon);
                var data2 = rr.data;
                // console.log("Emails block or allow",data2)
                var whiteListEmail = data2.whiteListEmail;
                // console.log("Spam whiteListEmail",whiteListEmail)
                console.log("split_email_clear", split_email_clear)
                for (var se in whiteListEmail) {
                    if (whiteListEmail[se] == split_email_clear[0]) {

                        //**  remove emails from whiteListEmail   **

                        AppSDK.dispatch("invokeUrl", {

                            xhrObj: {
                                "url": "https://mail.zoho.com/api/organization/" + zoid,
                                "type": "PUT",
                                "headers": {
                                    "Content-Type": "application/json"
                                },
                                "payload": {
                                    "zoid": zoid,
                                    "mode": "removeSpamCategory",
                                    "spamVO": {
                                        "spamCategory": "whiteListEmail",
                                        "whiteListEmail": split_email_clear
                                    }
                                },

                                "serviceName": "SpamMail"
                            }


                        }).then(function(successResponse) {

                                var suc = JSON.stringify(successResponse);
                                // console.log("remove block ",suc);
                                var par = JSON.parse(suc);
                                var responce = par.response;
                                let rr1 = JSON.parse(responce);
                                console.log("remove whitlist responce", rr1)
                                var status1 = rr1.status;
                                // var data2 = rr1.data;
                                // var whiteListEmail = data2.whiteListEmail;
                                // console.log("Remove whiteListEmail", whiteListEmail)
                                var code = status1.code;
                                console.log("remove whitelist code", code)
                                if (code == 200) {
                                    var Al_mail = document.getElementById(split_email_clear[0]);
                                    Al_mail.style.color = "black";

                                    for (var tt in All_Domain) {
                                        // console.log("AAA all mails",AllMails)
                                        // console.log("AAA All_Domain",All_Domain)
                                        const button2 = document.getElementById(split_email_clear[0] + "_allowemail");
                                        console.log("button2", button2)
                                        button2.disabled = false;
                                        if (button2.disabled == false) {
                                            var All_btn = document.getElementById(split_email_clear[0] + "_allowemail");
                                            //  console.log("eml", eml);
                                            All_btn.style.color = "green";
                                        }
                                    }
                                }

                            },
                            function(errorResponse) {
                                var err = JSON.stringify(errorResponse);
                                console.log("error ", err);

                            }
                        )


                        //*end remove email from whiteListEmail*//

                    }
                }


            },

            function(errorResponse) {
                var err = JSON.stringify(errorResponse);
                console.log("error ", err);

            })


        //** check black and remove **//


        AppSDK.dispatch("invokeUrl", {

            xhrObj: {
                "url": "https://mail.zoho.com/api/organization/" + zoid + "/antispam/data?spamCategory=blackListEmail&mode=getMarkingData&start=0&limit=500",
                "type": "GET",
                "headers": {
                    "Content-Type": "application/json"
                },
                "serviceName": "SpamMail"
            }


        }).then(function(successResponse) {
                var succ = JSON.stringify(successResponse);
                //  console.log("blockListDomains",succ);
                var res = JSON.parse(succ);
                var respon = res.response;
                let rr = JSON.parse(respon);
                var data2 = rr.data;
                var blackListEmail = data2.blackListEmail;
                console.log("blackListEmail", blackListEmail)
                for (var bdm in blackListEmail) {
                    console.log("blackListEmail", blackListEmail[bdm].email);
                    if (blackListEmail[bdm].email == split_email_clear[0]) {
                        // @@ Remove the code from blacklist @@ //
                        console.log("we can remove the code in blacklist")
                        AppSDK.dispatch("invokeUrl", {

                            xhrObj: {
                                "url": "https://mail.zoho.com/api/organization/" + zoid,
                                "type": "PUT",
                                "headers": {
                                    "Content-Type": "application/json"
                                },
                                "payload": {
                                    "zoid": zoid,
                                    "mode": "removeSpamCategory",
                                    "spamVO": {
                                        "spamCategory": "blackListEmail",
                                        "blackListEmail": split_email_clear
                                    }
                                },

                                "serviceName": "SpamMail"
                            }


                        }).then(function(successResponse) {

                                var suc = JSON.stringify(successResponse);
                                // console.log("remove block ",suc);
                                var par = JSON.parse(suc);
                                var responce = par.response;
                                let rr1 = JSON.parse(responce);
                                console.log("remove whitlist responce", rr1)
                                var status1 = rr1.status;
                                var code = status1.code;
                                console.log("remove whitelist code", code)
                                if (code == 200) {
                                    var Bl_mail = document.getElementById(split_email_clear[0]);
                                    Bl_mail.style.color = "black";

                                    const button2 = document.getElementById(split_email_clear[0] + "_blockemail");
                                    console.log("button2", button2)
                                    button2.disabled = false;
                                    if (button2.disabled == false) {
                                        var Bll_btn = document.getElementById(split_email_clear[0] + "_blockemail");
                                        //  console.log("eml", eml);
                                        Bll_btn.style.color = "red";
                                    }

                                }

                            },
                            function(errorResponse) {
                                var err = JSON.stringify(errorResponse);
                                console.log("error ", err);

                            }
                        )
                        // @@ Remove the code from blacklist @@ //
                    }

                }

            },

            function(errorResponse) {
                var err = JSON.stringify(errorResponse);
                console.log("error ", err);

            })
        //** End check black and remove **//

    },
    function(errorResponse) {
         var err = JSON.stringify(errorResponse);
        console.log("error ", err);
         var res = JSON.parse(err);
         var error_code =res.status;
            console.log("error responce",error_code); 
           // @ Server error alert @ //
            if(error_code==400){
              document.getElementById("Alert").style.display = "block";
            }
            // @ End Server error alert @ //

                }
                );

    //End check spam info
}

// **End Clear email from Blocklist and Whitelist ** //

var split_domain_clear = [];

function fun_cleardomain() {
    console.log("can i remove domain");
    console.log("Clear mails");
    var clear_domain = event.srcElement.id;
    console.log("clear All_mail", clear_domain)
    split_domain_clear.pop();
    const split_clear_domain = clear_domain.split('_');
    // console.log("split_Block_mail", split_clear_mail[0])
    split_domain_clear.push(split_clear_domain[0])
    console.log("split_domain_clear", split_domain_clear)

    // Check spam info

    AppSDK.dispatch("invokeUrl", {

        xhrObj: {
            "url": "https://mail.zoho.com/api/organization",
            "type": "GET",
            "headers": {
                "Content-Type": "application/json"
            },
            "serviceName": "SpamMail"
        }

    }).then(function(successResponse) {
        var succ = JSON.stringify(successResponse);
        // console.log(succ);
        var res = JSON.parse(succ);
        var respon = res.response;
        let rr = JSON.parse(respon);
        var data1 = rr.data;
        var zoid = data1.zoid;
        console.log("zoid", zoid);
        var status = rr.status;
        var code = status.code;
        // console.log("404 code:", code);


        //** check whitelist and remove **//


        AppSDK.dispatch("invokeUrl", {

            xhrObj: {
                "url": "https://mail.zoho.com/api/organization/" + zoid + "/antispam/data?spamCategory=whiteListDomain&mode=getMarkingData&start=0&limit=500",
                "type": "GET",
                "headers": {
                    "Content-Type": "application/json"
                },
                "serviceName": "SpamMail"
            }


        }).then(function(successResponse) {
                var succ = JSON.stringify(successResponse);
                // console.log("succ",succ);
                var res = JSON.parse(succ);
                var respon = res.response;
                let rr = JSON.parse(respon);
                var data2 = rr.data;
                // console.log("Emails block or allow",data2)
                var whiteListDomain = data2.whiteListDomain;
                console.log("Spam whiteListDomain", whiteListDomain)
                console.log("split_domain_clear", split_domain_clear)

                for (var se in whiteListDomain) {
                    if (whiteListDomain[se] == split_domain_clear[0]) {

                        //**  remove emails from whiteListEmail   **

                        AppSDK.dispatch("invokeUrl", {

                            xhrObj: {
                                "url": "https://mail.zoho.com/api/organization/" + zoid,
                                "type": "PUT",
                                "headers": {
                                    "Content-Type": "application/json"
                                },
                                "payload": {
                                    "zoid": zoid,
                                    "mode": "removeSpamCategory",
                                    "spamVO": {
                                        "spamCategory": "whiteListDomain",
                                        "whiteListDomain": split_domain_clear
                                    }
                                },

                                "serviceName": "SpamMail"
                            }


                        }).then(function(successResponse) {

                                var suc = JSON.stringify(successResponse);
                                // console.log("remove block ",suc);
                                var par = JSON.parse(suc);
                                var responce = par.response;
                                let rr1 = JSON.parse(responce);
                                console.log("remove whitlist responce", rr1)
                                var status1 = rr1.status;
                                var code = status1.code;
                                console.log("remove whitelist code", code)

                                if (code == 200) {
                                    var Al_mail = document.getElementById(split_domain_clear[0]);
                                    Al_mail.style.color = "black";

                                    const button2 = document.getElementById(split_domain_clear[0] + "_allowdomain");
                                    console.log("button2", button2)
                                    // console.log("AAA all mails",AllMails)
                                    // console.log("AAA All_Domain",All_Domain)
                                    //  const All_Mails = [...new Set(AllMails)];
                                    //  console.log("All_Mails", All_Mails);
                                    // for(var dk in split_domain_clear){
                                    //     for(var jk in All_Mails){

                                    //      var Mails_block = All_Mails[jk].split("@");
                                    //       if(All_Domain[dk]==Mails_block[1]){
                                    //         console.log("Mails_block[1]",Mails_block[1])
                                    //       }
                                    //     }
                                    // }

                                    button2.disabled = false;
                                    if (button2.disabled == false) {
                                        var All_btn = document.getElementById(split_domain_clear[0] + "_allowdomain");
                                        //  console.log("eml", eml);
                                        All_btn.style.color = "green";
                                    }
                                    // console.log("Abcd_all_mails", AllMails)

                                    for (var yy in split_domain_clear) {
                                        for (var aa in AllMails) {
                                            var spilt_mail = AllMails[aa].split('@')[1];
                                            if (split_domain_clear[yy] == spilt_mail) {
                                                var Aa_mail = document.getElementById(AllMails[aa]);
                                                Aa_mail.style.color = "black";
                                                const E_allow_Btn = document.getElementById(AllMails[aa] + "_allowemail");
                                                console.log("E_allow_Btn fro Allow", E_allow_Btn)
                                                E_allow_Btn.disabled = false;
                                                if (E_allow_Btn.disabled == false) {
                                                    E_allow_Btn.style.color = "green";
                                                }
                                            }
                                        }
                                    }

                                }

                            },
                            function(errorResponse) {
                                var err = JSON.stringify(errorResponse);
                                console.log("error ", err);

                            }
                        )


                        //*end remove email from whiteListEmail*//

                    }
                }


            },

            function(errorResponse) {
                var err = JSON.stringify(errorResponse);
                console.log("error ", err);

            })


        //** check black domain and remove **//


        AppSDK.dispatch("invokeUrl", {

            xhrObj: {
                "url": "https://mail.zoho.com/api/organization/" + zoid + "/antispam/data?spamCategory=blackListDomain&mode=getMarkingData&start=0&limit=500",
                "type": "GET",
                "headers": {
                    "Content-Type": "application/json"
                },
                "serviceName": "SpamMail"
            }


        }).then(function(successResponse) {
                var succ = JSON.stringify(successResponse);
                //  console.log("blockListDomains",succ);
                var res = JSON.parse(succ);
                var respon = res.response;
                let rr = JSON.parse(respon);
                var data2 = rr.data;
                var blackListDomain = data2.blackListDomain;
                console.log("blackListEmail", blackListDomain)
                for (var bdm in blackListDomain) {
                    console.log("blackListEmail", blackListDomain[bdm].email);
                    if (blackListDomain[bdm].email == split_domain_clear[0]) {
                        // @@ Remove the code from blacklist @@ //
                        console.log("we can remove the code in blacklist")
                        AppSDK.dispatch("invokeUrl", {

                            xhrObj: {
                                "url": "https://mail.zoho.com/api/organization/" + zoid,
                                "type": "PUT",
                                "headers": {
                                    "Content-Type": "application/json"
                                },
                                "payload": {
                                    "zoid": zoid,
                                    "mode": "removeSpamCategory",
                                    "spamVO": {
                                        "spamCategory": "blackListDomain",
                                        "blackListDomain": split_domain_clear
                                    }
                                },

                                "serviceName": "SpamMail"
                            }


                        }).then(function(successResponse) {

                                var suc = JSON.stringify(successResponse);
                                // console.log("remove block ",suc);
                                var par = JSON.parse(suc);
                                var responce = par.response;
                                let rr1 = JSON.parse(responce);
                                console.log("remove whitlist responce", rr1)
                                var status1 = rr1.status;
                                // var data2 = rr1.data;
                                // var whiteListEmail = data2.whiteListEmail;
                                // console.log("Remove whiteListEmail", whiteListEmail)
                                var code = status1.code;
                                console.log("remove whitelist code", code)

                                if (code == 200) {
                                    var Bl_mail = document.getElementById(split_domain_clear[0]);
                                    Bl_mail.style.color = "black";

                                    const button2 = document.getElementById(split_domain_clear[0] + "_blockdomain");
                                    console.log("button2", button2)
                                    button2.disabled = false;
                                    if (button2.disabled == false) {
                                        var Bll_btn = document.getElementById(split_domain_clear[0] + "_blockdomain");
                                        //  console.log("eml", eml);
                                        Bll_btn.style.color = "red";
                                    }
                                    for (var yy in split_domain_clear) {
                                        for (var aa in AllMails) {
                                            var spilt_mail = AllMails[aa].split('@')[1];
                                            if (split_domain_clear[yy] == spilt_mail) {
                                                var Aa_mail = document.getElementById(AllMails[aa]);
                                                Aa_mail.style.color = "black";
                                                const E_block_Btn = document.getElementById(AllMails[aa] + "_blockemail");
                                                const E_allow_Btn = document.getElementById(AllMails[aa] + "_allowemail");
                                                console.log("E_block_Btn", E_block_Btn)
                                                E_block_Btn.disabled = false;
                                                E_allow_Btn.disabled = false;
                                                if (E_block_Btn.disabled == false || E_allow_Btn.disabled == false) {
                                                    E_block_Btn.style.color = "red";
                                                    E_allow_Btn.style.color = "green";
                                                }
                                            }
                                        }
                                    }

                                }

                            },
                            function(errorResponse) {
                                var err = JSON.stringify(errorResponse);
                                console.log("error ", err);

                            }
                        )
                        // @@ Remove the domain from blacklist @@ //
                    }

                }

            },

            function(errorResponse) {
                var err = JSON.stringify(errorResponse);
                console.log("error ", err);

            })
        //** End check black and remove **//


        //**Allow domians**//
        AppSDK.dispatch("invokeUrl", {

            xhrObj: {
                "url": "https://mail.zoho.com/api/organization/" + zoid + "/antispam/data?spamCategory=whiteListDomain&mode=getMarkingData&start=0&limit=500",
                "type": "GET",
                "headers": {
                    "Content-Type": "application/json"
                },
                "serviceName": "SpamMail"
            }


        }).then(function(successResponse) {
                // 
                var succ = JSON.stringify(successResponse);
                //  console.log("whiteListDomains",succ);
                var res = JSON.parse(succ);
                var respon = res.response;
                let rr = JSON.parse(respon);
                var data2 = rr.data;
                // console.log("rrrrr",data2)
                var whiteListDomains = data2.whiteListDomain;
                // remove domain whitlist mail here

            },

            function(errorResponse) {
                var err = JSON.stringify(errorResponse);
                console.log("error ", err);

            })

        //**End Allow domians**//


        //**Block domians**//
        AppSDK.dispatch("invokeUrl", {

            xhrObj: {
                "url": "https://mail.zoho.com/api/organization/" + zoid + "/antispam/data?spamCategory=blackListDomain&mode=getMarkingData&start=0&limit=500",
                "type": "GET",
                "headers": {
                    "Content-Type": "application/json"
                },
                "serviceName": "SpamMail"
            }


        }).then(function(successResponse) {
                // 
                var succ = JSON.stringify(successResponse);
                //  console.log("blockListDomains",succ);
                var res = JSON.parse(succ);
                var respon = res.response;
                let rr = JSON.parse(respon);
                var data2 = rr.data;
                //  console.log("rrrrr",data2)
                var blockListDomains = data2.blackListDomain;
                // remove domain blocklist mail here


            },

            function(errorResponse) {
                var err = JSON.stringify(errorResponse);
                console.log("error ", err);

            })

        //**End Block domians**//

        //** end Domain whitelisted**//

    },
    function(errorResponse) {
           var err = JSON.stringify(errorResponse);
        console.log("error ", err);
         var res = JSON.parse(err);
         var error_code =res.status;
            console.log("error responce",error_code); 
           // @ Server error alert @ //
            if(error_code==400){
              document.getElementById("Alert").style.display = "block";
            }
            // @ End Server error alert @ //

                }
    
    );

    //End check spam info
}


function Ok(){
     document.getElementById("maildet").style.display = "none";
     document.getElementById("Note").style.display = "none";
     document.getElementById("button").style.display = "none";
     document.getElementById("Alert").style.display = "none";
     
}
/**
 *  Event to detect compose window open
 */
// AppSDK.on("compose_open", () => {
//     window.apiUtil.getComposeDetails().then((composeInfo) => {
//         console.log(composeInfo);
//         window.appView.populateCurrentComposeDetails(composeInfo);
//     });
// });

/**
 *  Event to get saved draft content
 */

AppSDK.on("draft_save", (draftContent) => {
    console.log(draftContent);
    window.appView.populateSavedDraftDetails(draftContent);
});

/**
 * Event to get dragged mail content
 */
AppSDK.on("drop", function(dropInfo) {
    console.log(dropInfo);
    let data = dropInfo.data && dropInfo.data[0];
    if (dropInfo.type === "mail") {
        populateMailDetails(data);
        return;
    }
    window.appView.populateAttachmentDetails(dropInfo);
    if (!$("#attachmentInfo").find(".cs_accTitle").hasClass("active")) {
        $("#attachmentInfo").find(".cs_accTitle").click();
    }
});

/**
 * Event to detect preview mail close
 */
AppSDK.on("mail_close", function() {
    window.appView.populateCurrentMailDetails({});
    window.appView.populateContactDetails();
    window.appView.populateRelationalData();
});

/**
 * Get the Night Mode and Font settings of the inbox, inside your application.
 */

AppSDK.on("mail_setting", function(mailSettingsData) {
    console.log(mailSettingsData);
});

$(document).ready(function() {
    window.appView.bindAppEvents();
    window.appView.bindApiEvents();
});
