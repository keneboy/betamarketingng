const userData = [
    {
      name: 'Jan',
      "Active User": 4000,
    },
    {
      name: 'Feb',
      "Active User": 3000,
    },
    {
      name: 'March',
      "Active User": 2000,
    },
    {
      name: 'Apr',
      "Active User": 2780
    },
    {
      name: 'May',
      "Active User": 1890,

    },
    {
      name: 'Jun',
      "Active User": 2390
    },
    {
      name: 'Jul',
      "Active User": 3490
    },
    {
        name: 'Aug',
        "Active User": 3490
      },
      {
        name: 'Sept',
        "Active User": 3490
      },
      {
        name: 'Oct',
        "Active User": 3490
      },
      {
        name: 'Nov',
        "Active User": 3490
      },
      {
        name: 'Dec',
        "Active User": 2490
      },
  ];
  const productData = [
    {
      name: 'Jan',
      "sales": 1000,
    },
    {
      name: 'Feb',
      "sales": 3000,
    },
    {
      name: 'March',
      "sales": 5000,
    },

  ];
  const rows = [
    { id: 1, username: 'Jon Snow',  age: 35, avatar:"/images/IMG_0244.JPG",email:"jonSnow@gmail.com",status:"Active",transaction:"$120.00"},
    { id: 2, username: 'Jon Snow',  age: 35, avatar:"/images/IMG_0244.JPG",email:"jonSnow@gmail.com",status:"Active",transaction:"$120.00"},
    { id: 3, username: 'Jon Snow',  age: 35, avatar:"/images/IMG_0244.JPG",email:"jonSnow@gmail.com",status:"Inactive",transaction:"$120.00"},
    { id: 4, username: 'Jon Snow',  age: 35, avatar:"/images/IMG_0244.JPG",email:"jonSnow@gmail.com",status:"Active",transaction:"$120.00"},
    { id: 5, username: 'Jon Snow',  age: 35, avatar:"/images/IMG_0244.JPG",email:"jonSnow@gmail.com",status:"Active",transaction:"$120.00"},
    { id: 6, username: 'Jon Snow',  age: 35, avatar:"/images/IMG_0244.JPG",email:"jonSnow@gmail.com",status:"Inactive",transaction:"$120.00"},
    { id: 7, username: 'Jon Snow',  age: 35, avatar:"/images/IMG_0244.JPG",email:"jonSnow@gmail.com",status:"Active",transaction:"$120.00"},
    { id: 8, username: 'Jon Snow',  age: 35, avatar:"/images/IMG_0244.JPG",email:"jonSnow@gmail.com",status:"Active",transaction:"$120.00"}, 
    { id: 9, username: 'Jon Snow',  age: 35, avatar:"/images/IMG_0244.JPG",email:"jonSnow@gmail.com",status:"Active",transaction:"$120.00"},
    { id: 10, username: 'Jon Snow',  age: 35, avatar:"/images/IMG_0244.JPG",email:"jonSnow@gmail.com",status:"Inactive",transaction:"$120.00"},   
  ];
  const productRows = [
    { id: 1, name: 'Coca cola',  img:"/image/house-1.jpeg",stock:123,status:"Available",price:"$120.00"},
    { id: 2, name: 'Coca cola',  img:"/image/house-1.jpeg",stock:123,status:"Available",price:"$120.00"},
    { id: 3, name: 'Coca cola',  img:"/image/house-1.jpeg",stock:123,status:"Unavailable", price:"$120.00"},
    { id: 4, name: 'Coca cola',  img:"/image/house-1.jpeg",stock:123,status:"Available",price:"$120.00"},
    { id: 5, name: 'Coca cola',  img:"/image/house-1.jpeg",stock:123,status:"Available",price:"$120.00"},
    { id: 6, name: 'Coca cola',  img:"/image/house-1.jpeg",stock:123,status:"Unavailable",price:"$120.00"},
    { id: 7, name: 'Coca cola',  img:"/image/house-1.jpeg",stock:123,status:"Available",price:"$120.00"},
    { id: 8, name: 'Coca cola',  img:"/image/house-1.jpeg",stock:123,status:"Available",price:"$120.00"}, 
    { id: 9, name: 'Coca cola',  img:"/image/house-1.jpeg",stock:123,status:"Available",price:"$120.00"},
    { id: 10, name: 'Coca cola',  img:"/image/house-1.jpeg",stock:123,status:"Unavailable",price:"$120.00"},   
  ];
  export {
    userData,
    productData,
    rows,
    productRows
  } 