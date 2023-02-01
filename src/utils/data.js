//add to db
const shoeData = {
    'NewBalance':{
        key:'NewBalance997',
        name:'New Balance',
        color:'blue',
        primary:'#2db7f5',
        watermark:'New Balance',
        heading:`New Balance 997's`,
        subHeading:'Dad Shoes',
        description:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.`,
        price:189,
        basePrice:189,
        quantity:1
    },
    'Vans':{
        key:'Vans',
        name:'Vans',
        color:'green',
        primary:'#87d068',
        watermark:'Vans',
        heading:`Classic Vans`,
        subHeading:'Son wears these Shoes',
        description:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.`,
        price:289,
        basePrice:289,
        quantity:1
        
    },
    'NikeAirPegasus':{
        key:'NikeAirPegasus',
        name:'Nike Air Pegasus',
        color:'black',
        primary:'grey',
        watermark:'Nike',
        heading:`Nike Pegasus`,
        subHeading:'Nice Running Shoes',
        description:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.`,
        price:389,
        basePrice:389,
        quantity:1
    },
    'Jordan':{
        key:'Jordan',
        name:'Nike Air Jordans',
        color:'red',
        primary:'#f50',
        watermark:'Nike',
        heading:`Nike Air Jordan 1's`,
        subHeading:`🐐 Shoes?`,
        description:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.`,
        price:489,
        basePrice:489,
        quantity:1
    },
    'Fila':{
        key:'Fila',
        name:'Fila Runners',
        color:'red',
        primary:'orange',
        watermark:'Custom',
        heading:`Fila Customizable Shoes.`,
        subHeading:'Click on the model to select colors',
        description:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.`,
        price:89,
        basePrice:89,
        quantity:1
    },
}
const successMessage = {
    message:'Order Placed Successfully',
    description:'Order Number 2145677. Mail has been sent to your email with invoice details. Thanks for Shopping with us'
  }
const emptyMessage = {
    message:'No Orders Placed yet',
    description:'Select some cool sneakers dude!'
}

module.exports ={
    shoeData,
    successMessage,
    emptyMessage
}