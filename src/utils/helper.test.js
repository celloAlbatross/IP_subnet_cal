import { expect } from 'chai';
import { 
    add,
    totalNumOfHost,
    decimalToBinary,
    binaryToDecimal,
    convertToSubnet,
    numOfUsableHosts,
    convertToIpv4,
    ipv4ToBinary,
    broadCastAddress,
    wildCardConverter
} from './helper';

describe('test add', () => {
    it('should add', () => {
        expect(add(1,2)).to.equal(3);
    })
})

describe('test num of host', () => {
    it('should calculate no. of host', () => {
        expect(totalNumOfHost(30)).to.equal(4);
    })
})

describe('test binary converter', () => {
    it('should convert to binary', () => {
        expect(decimalToBinary(255)).to.equal("11111111");
    })
})

describe('test decimal converter', () => {
    it('should convert to decimal', () => {
        expect(binaryToDecimal("11")).to.equal(3);
    })
})

describe('test subnet converter', () => {
    it('should convert to subnet', () => {
        expect(convertToSubnet(1)).to.equal("10000000000000000000000000000000");
        expect(convertToSubnet(2)).to.equal("11000000000000000000000000000000");
    })
})

describe('test No. of usable hosts', () => {
    it('should cal no. of usable hosts', () => {
        expect(numOfUsableHosts(30)).to.equal(2);
        expect(numOfUsableHosts(32)).to.equal(0);
    })
})

describe('test Ipv4 converter', () => {
    it('should convert to subnet Ipv4', () => {
        expect(convertToIpv4("10000000000000000000000000000000")).to.equal("128.0.0.0");
        expect(convertToIpv4("11000000000000000000000000000000")).to.equal("192.0.0.0");
    })
})

describe('test ipv4toBi converter', () => {
    it('should convert to binary (from Ipv4)', () => {
        expect(ipv4ToBinary("128.0.0.0")).to.equal("10000000000000000000000000000000");
        expect(ipv4ToBinary("192.0.0.0")).to.equal("11000000000000000000000000000000");
    })
})

describe('calculate broadcast', () => {
    it('should calculate broadcast', () => {
        expect(broadCastAddress(31,"255.255.0.129")).to.equal("255.255.0.129");
        expect(broadCastAddress(30,"255.255.0.14")).to.equal("255.255.0.15");
    })
})

describe('calculate wildCard', () => {
    it('should calculate wildCard', () => {
        expect(wildCardConverter("255.255.255.0")).to.equal("0.0.0.255");
        expect(wildCardConverter("255.255.240.0")).to.equal("0.0.15.255");
    })
})