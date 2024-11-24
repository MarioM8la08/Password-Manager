let array = [
    {
      company: 'dsaaaaaaa',
      email: 'aaaaaaaaaaaaaaaaaaa',
      password: '5e18d82283ae5a03a272ffb9e12fb432993972cb9024089c12482e8b632e37e2',
      key: 'f43c1f638e3a19d226658f7d460d52e53a4c0b6ade2a2d712620b719b18b5af3',
      iv: '1c0d78d4f062117494cd10df26d101f2',
      hmac: '7fa23348e15deaf756b4c86208b8075ce94e3a6ece89f13d98d05427095b3a6d',
      nickname: 'aaaaaaaaaaaaaa',
      note: 'aaaaaaaaaaaaaaaaaa'
    },
    {
      company: 'dffds',
      email: 'dsfdfsd',
      password: '9636fa4be09050a9b35757878a73d354',
      key: '3abda11bc8af695723dbb2550ad9262a365f3fe9480443c616527a696dc5feb1',
      iv: '2bb22abb6ad64dff4aa693158cf57511',
      hmac: '62a7a1a2c75475ffdbe8e878b0a1869c081b2ba9052ae9e19e67b41e3fee645a',
      nickname: 'dfsdfsds',
      note: 'fdfs'
    },
    {
      company: 'sdasddsa',
      email: 'sdaasdsad',
      password: 'b99294e28f6970b25edd32a9073880bc',
      key: 'ae57a6a25d99b0ee402e324e09c56b92ab35d13bce1d655c5dc9562fcf385107',
      iv: '9674e7405a0fd94dd70888f41ab9200b',
      hmac: '4bd8a2ebad238852816f285c2a83e8e873fd18694942bafa1565cf4183adeeb1',
      nickname: 'sdasdasadasd',
      note: 'sadsadasd'
    },
    {
      company: 'dfsdfssdf',
      email: 'dsfdsfdsfd',
      password: '84130bea6de6572cf183336246d514a5',
      key: 'ec5fac7e87e04872ceec9357a04d7891d78ed8bd2051903c90146d188c0d642f',
      iv: '2dc7cd0e310539d20fd70d4b9819a208',
      hmac: '827cba759d88436327efca2503d429eed9094ff9ef7a0a22e2119b8aa813fb31',
      nickname: 'dfsfdsdfsdsf',
      note: 'sdfsdfdfs'
    },
    {
      company: 'adsads',
      email: 'asdsadasd',
      password: 'e882a68e7b023a09fec7281810e0e274',
      key: '64a12cd54e2bacc138daa2ed4fe74df7d8cb8f36360f8defcb595136d87bb136',
      iv: '8286a52f072517f37255468729413b52',
      hmac: '6fa35f4df844b4f7c72c362a2d6f5f34118a8b7b3906adeb3a43ed6872424cf0',
      nickname: 'asdsda',
      note: 'asdasddasad'
    },
    {
      company: 'Epic Games',
      email: 'mario.m8la@gmail.com',
      password: '62702e54cbb7c7dafc374fb89fe6d94a178b615e65fea60446911e23040de5c0',
      key: '987ee4c494f82db87585b24bda50bcc9f877d34bd53654db0f1df65e7ac4349d',
      iv: '178c70c5ead911e78c8c4de66abe106f',
      hmac: '9f36ce27731fde5c3e95af6bb05f6888206d65d39004e788c36e6d9664e1bce0',
      nickname: 'Mariom8la',
      note: '..'
    },
    {
      company: 'ads',
      email: 'sssssssssssss',
      password: 'bb9f0b1678fbdcaec6919d0ca5797c1d',
      key: '9b7547b0dc5dee55bc3b8db09e071d9a0bcc40df9943733cddd701d1b6598f26',
      iv: 'c16724005fde7de7d87186eb2eacb5c2',
      hmac: '18d748fe8de7a5fd79694e0caecea43906633b7248d4d94d6f634e04f0279a8d',
      nickname: 'sssssssssssss',
      note: 'sssssssssssssss'
    }
];
let array2 = {company: `ciao`}
console.log(array2.company)
console.log(array[0]);
for(i=0; i < array.length; i++){
    let variabile = array[i][`company`];
    console.log(variabile);
}