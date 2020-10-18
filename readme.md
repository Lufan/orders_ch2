curl  -v http://localhost:8080/orders \
-H 'Content-Type: application/json' \
--data-binary @- << EOF
{
  "items":[
    {
      "itemCode":"IT0001",
      "quantity":3
    },
    {
      "itemCode":"IT0004",
      "quantity":1
    }
  ],
  "shippingAddress":"No 4, Castro Street, Mountain View, CA, USA"
}
EOF
