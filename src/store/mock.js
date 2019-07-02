const getGuid = () => Math.floor(Math.random()*100000000000)

const items = [
  { 
    name: 'Kostia',
    phone: "+79680608071",
    created: +new Date,
    guid: getGuid(),
    
  },
  {
    name: 'Kosti222',
    phone: "+79680608022",
    guid: getGuid(),
    created: +new Date,
    updated: null,
  },
  {
    name: 'Andrews',
    phone: "+19929129129",
    created: +new Date,
    guid: getGuid(),
    updated: null,
  }
]

export default items