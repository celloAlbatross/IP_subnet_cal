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
    console.log(temp);
    temp = temp&4294967295;
    temp = decimalToBinary(temp);
    var zero = 32 - temp.length;
    var tempZero = "0".repeat(zero);
    wildCard += tempZero;
    wildCard += temp;
    wildCard = convertToIpv4(wildCard);
    console.log(wildCard);
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

 export function decimalToHex(decimal) {
     console.log("0x" + decimal.toString(16));
     return "0x"+decimal.toString(16);
 } 

