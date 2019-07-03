const { getGuid } = require('@/common/functions');

const items = [
  { 
    name: 'Kostia',
    phone: "+79680608071",
    createdAt: +new Date,
    guid: getGuid(),
    
  },
  {
    name: 'Kosti222',
    phone: "+79680608022",
    guid: getGuid(),
    createdAt: +new Date,
    updatedAt: null,
  },
  {
    name: 'Kostia--33',
    phone: "+79680608022",
    guid: getGuid(),
    createdAt: +new Date,
    updatedAt: null,
  },
  {
    name: 'Andrews',
    phone: "+19929129129",
    createdAt: +new Date,
    guid: getGuid(),
    updatedAt: null,
  }
]

export default items