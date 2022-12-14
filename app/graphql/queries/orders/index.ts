export const GetOrders = `
query ($vendorId: String!) {
    getOrders (vendorId: $vendorId) {
      id
      createdAt
      cart {
        checkedOut
        createdAt
        finalPrice
        totalPrice
        updatedAt
        items {
          Product {
            title
            title_ar
            type
            Tags {
              title
              title_ar
            }
            startDate
            endDate
            endTime
            image
            location
          }
         productVariant
         quantity
         slots {
          endTime
          startTime
         }
      }
      }
      customerInfo {
        firstName
        lastName
        phone
      }
      deliveryMethod 
      paymentMethod
      status
  }
}
`;

export const GetOrder = `
query ($id: String!) {
    getOrder (id: $id) {
      id
      createdAt
      cart {
        checkedOut
        createdAt
        finalPrice
        items {
            Product {
              title
              title_ar
              type
              Tags {
                title
                title_ar
              }
              startDate
              endDate
              endTime
              image
              location
            }
           productVariant
           quantity
           slots {
            endTime
            startTime
           }
        }
        totalPrice
        updatedAt
      }
      customerInfo {
        firstName
        lastName
        phone
      }
      deliveryMethod 
      paymentMethod
      status
  }
}
`;
