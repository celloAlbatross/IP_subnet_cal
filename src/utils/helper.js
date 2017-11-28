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

export function fillZero(binary) {
    var numZero = 32 - binary.length;
    var res = "";
    for(var i=0; i<numZero; i++) {
        res += 0;
    }
    for(var i=0; i<binary.length; i++) {
        res += binary[i];
    }
    return res;
}

export function usableRange(network, broadCast, n) {
    var min = binaryToDecimal(ipv4ToBinary(network)) + 1;
    var max = binaryToDecimal(ipv4ToBinary(broadCast)) - 1;
    if(n > 30) {
        return "NA";
    } else {
        min = convertToIpv4(fillZero(decimalToBinary(min)));
        max = convertToIpv4(fillZero(decimalToBinary(max)));
        // console.log(min);
        // console.log(max);
        return min + " - " + max;
    }
}

export function ipv4ToDecimal(ipv4) {
    var res = ipv4ToBinary(ipv4);
    res = binaryToDecimal(res);
    return res;
}

export function ipTypeClassifier(ipAddress) {
    var privateAddress = [];
    privateAddress.push(ipv4ToDecimal("10.0.0.0"));
    privateAddress.push(ipv4ToDecimal("10.255.255.255"));
    privateAddress.push(ipv4ToDecimal("172.16.0.0"));
    privateAddress.push(ipv4ToDecimal("172.31.255.255"));
    privateAddress.push(ipv4ToDecimal("192.168.0.0"));
    privateAddress.push(ipv4ToDecimal("192.168.255.255"));
    ipAddress = ipv4ToDecimal(ipAddress)
    if(ipAddress >= privateAddress[0] && ipAddress <= privateAddress[1]) {
        return "Private";
    } else if(ipAddress >= privateAddress[2] && ipAddress <= privateAddress[3]) {
        return "Private";
    } else if(ipAddress >= privateAddress[4] && ipAddress <= privateAddress[5]) {
        return "Private";
    } else {
        return "Public";
    }
}

export function possibleNetworkAddress(n, ipAddress) {
    var rangeIp;
    var res = [];
    var temp;
    var x=0;
    var resTemp;
    var tempN = n;
    temp = ipAddress.split(".");
    if(n <= 30 && n >= 25) {
        rangeIp = totalNumOfHost(n);
        resTemp = temp[0] + "." + temp[1] + "." + temp[2] + ".";
        for(var i=0; i<130; i++) {
            if(x > 255) {
                break;
            }
            var tempNetwork = resTemp+x;
            var tempBroadCast = broadCastAddress(tempN, tempNetwork);
            var data = {
                networkAddress: tempNetwork,
                broadCastAdd: tempBroadCast,
                use: usableRange(tempNetwork, tempBroadCast, tempN) 
            };
            res.push(data); 
            // res.push(resTemp+x);
            x += rangeIp;
        }

    } else if(n <= 23 && n >= 17) {
        n += 8;
        rangeIp = totalNumOfHost(n);
        resTemp = temp[0] + "." + temp[1] + ".";
        for(var i=0; i<130; i++) {
            if(x > 255) {
                break;
            }
            var tempNetwork = resTemp + x + ".0";
            var tempBroadCast = broadCastAddress(tempN, tempNetwork);
            var data = {
                networkAddress: tempNetwork,
                broadCastAdd: tempBroadCast,
                use: usableRange(tempNetwork, tempBroadCast, tempN) 
            };
            res.push(data);
            // res.push();
            x += rangeIp;
        }
    } else if(n <= 15 && n >= 9) {
        n += 16;
        rangeIp = totalNumOfHost(n);
        resTemp = temp[0] + ".";
        for(var i=0; i<130; i++) {
            if(x > 255) {
                break;
            }
            var tempNetwork = resTemp + x + ".0.0";
            var tempBroadCast = broadCastAddress(tempN, tempNetwork);
            var data = {
                networkAddress: tempNetwork,
                broadCastAdd: tempBroadCast,
                use: usableRange(tempNetwork, tempBroadCast, tempN) 
            };
            res.push(data);
            // res.push(resTemp + x + ".0.0");
            x += rangeIp;
        }
    } else if(n <= 7 && n >= 1) {
        n += 24;
        rangeIp = totalNumOfHost(n);
        for(var i=0; i<130; i++) {
            if(x > 255) {
                break;
            }
            var tempNetwork = x + ".0.0.0";
            var tempBroadCast = broadCastAddress(tempN, tempNetwork);
            var data = {
                networkAddress: tempNetwork,
                broadCastAdd: tempBroadCast,
                use: usableRange(tempNetwork, tempBroadCast, tempN) 
            };
            res.push(data);
            x += rangeIp;
        }
    }
    // console.log(res);
    // var b = broadCastAddress(4,res[3]);
    // console.log(b);
    // console.log(usableRange(res[3],b, 4));

    // console.log(res[1].networkAddress);
    // console.log(res[1].broadCastAdd);
    // console.log(res[1].use);
    return res;
}

