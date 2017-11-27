const max = binaryToDecimal("11111111111111111111111111111111");

export function add(a, b) {
    return a+b;
}

export function decimalToBinary(decimal) {
    return (decimal.toString(2));
}

export function binaryToDecimal(binary) {
    return parseInt(binary, 2);
}

export function totalNumOfHost(subnet) {
    var x = 32 - subnet;
    return Math.pow(2, x);
}

export function ipv4ToBinary(ipv4) {
    var tempIpv4 = "";
    var Bi = "";
    var temp;
    var zero;
    var temp1;
    for(var i=0; i<ipv4.length; i++) {
        if(ipv4[i] == ".") {
            temp = decimalToBinary(parseInt(tempIpv4));
            zero = 8-temp.length;
            temp1 = "0".repeat(zero) 
            Bi += temp1;
            Bi += temp;
            tempIpv4 = "";
        }else {
            tempIpv4 += ipv4[i];
        }
        if(i == ipv4.length-1) {
            temp = decimalToBinary(parseInt(tempIpv4));
            zero = 8-temp.length;
            temp1 = "0".repeat(zero);
            Bi += temp1;
            Bi += temp;
        }
    }
    return Bi;
}

export function convertToIpv4(subnetBi) {
    var binary = "";
    var subnet = "";
    for(var i=0; i<=32 ; i++) {
        if((i % 8) == 0 && i != 0) {
            subnet += binaryToDecimal(binary);
            if(i != 32) {
                subnet += ".";
            }
            else {
                break;
            }
            binary = "";
        }
        binary += subnetBi[i];
    }
    return subnet;
}

export function convertToSubnet(n) {
    var res="";
    var x = 32 - n;
    var binary = "";
    var subnet = "";
    while(n > 0) {
        res += "1";
        n--;
    }
    while(x > 0) {
        res += "0";
        x--;
    }

    return res;
}

export function binarySubnetMask(n) {
    var binary = convertToSubnet(n);
    var res = "";
    for(var i=0; i<binary.length; i++) {
        res += binary[i];
        if(i == 7 || i == 15 || i == 23 ) {
            res += ".";
        }
    }
    return res;
}

export function numOfUsableHosts(n) {
    return (totalNumOfHost(n)-2)<0 ? 0:(totalNumOfHost(n)-2);
}

export function broadCastAddress(subnetMask, IPaddress) {
    var binaryIP = ipv4ToBinary(IPaddress);
    // console.log(binaryIP);
    var broadCast="";
    for(var i = 0; i<subnetMask; i++) {
        broadCast += binaryIP[i];
    }
    for(var i = subnetMask; i<32; i++) {
        broadCast += "1";
    }
    return convertToIpv4(broadCast);
}

export function wildCardConverter(subnetMask) {
    var wildCard="";
    var temp = ~(binaryToDecimal(ipv4ToBinary(subnetMask)));
    // console.log(temp);
    temp = temp&4294967295;
    temp = decimalToBinary(temp);
    var zero = 32 - temp.length;
    var tempZero = "0".repeat(zero);
    wildCard += tempZero;
    wildCard += temp;
    wildCard = convertToIpv4(wildCard);
    // console.log(wildCard);
    return wildCard;
}

export function ipClass(n) {
     if(n > 23) {
         return "C";
     } else if(n > 15) {
         return "B";
     } else if(n > 7) {
         return "A";
     } else {
         return "NA";
     }
}

export function splitClass(ipClass) {
    var res = [];
    if(ipClass == "Any") {
         for(var i=32; i>=1; i--) {
            res.push(convertToIpv4(convertToSubnet(i)));
        }
    } else if(ipClass == "A") {
         for(var i=32; i>=8; i--) {
            res.push(convertToIpv4(convertToSubnet(i)));
        }
    } else if(ipClass == "B") {
        for(var i=32; i>=16; i--) {
           res.push(convertToIpv4(convertToSubnet(i)));
        }
    } else if(ipClass == "C") {
        for(var i=32; i>=24; i--) {
           res.push(convertToIpv4(convertToSubnet(i)));
        }
    }

    return res;
}

 export function decimalToHex(decimal) {
    //  console.log("0x" + decimal.toString(16));
     return "0x"+decimal.toString(16);
 } 

 export function reverseIpv4(ipv4) {
     var point = [-1];
     var arpa = "";
     for(var i=0; i<ipv4.length; i++) {
        if(ipv4[i] == ".") {
            point.push(i);
        }
     }
     for(var i=0; i<4; i++) {
        //  console.log(point[i]);
     }
     for(var i=3; i>=0; i--) {
        for(var j=1; j<=4; j++) {
            if(ipv4[point[i]+j] == "." || point[i]+j == ipv4.length) {
                arpa += ".";
                break;
            }
            arpa += ipv4[point[i]+j];
        }
     }
     return arpa + "in-addr.arpa";
 }

 export function networkAddress(subnetMask, ipAddress) {
     var tempIP = ipv4ToBinary(ipAddress);
     var tempSub = ipv4ToBinary(subnetMask);
     var res = "";
     for(var i=0; i<32; i++) {
         if(tempIP[i] == tempSub[i]) {
             res += tempIP[i];
         } else {
             res += "0";
         } 
     }
     return convertToIpv4(res);
 }

 export function usableRange(network, broadCast) {

 }
