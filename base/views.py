from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ProductSerializer
from .models import Product

@api_view(['GET'])
def index(req):
    return Response('hello')

@api_view(['GET','POST','DELETE','PUT','PATCH'])
def product(req,id=-1):
    if req.method =='GET':
        if id > -1:
            try:
                temp_Product=Product.objects.get(id=id)
                return Response (ProductSerializer(temp_Product,many=False).data)
            except Product.DoesNotExist:
                return Response ("not found")
        all_product=ProductSerializer(Product.objects.all(),many=True).data
        return Response ( all_product)
    if req.method =='POST':
        product_serializer = ProductSerializer(data=req.data)
        if product_serializer.is_valid():
            product_serializer.save()
            return Response ("post...")
        else:
            return Response (product_serializer.errors)
    if req.method == 'DELETE':
        try:
            temp_Product = Product.objects.get(id=id)
        except Product.DoesNotExist:
            return Response("not found", status=404)  # Ensure correct status code for not found

        temp_Product.delete()
        return Response("del...", status=204)  # Typically, DELETE responses return 204 No Content
    if req.method =='PUT':
        try:
            temp_Product=Product.objects.get(id=id)
        except Product.DoesNotExist:
            return Response ("not found")
       
        ser = ProductSerializer(data=req.data)
        old_Product = Product.objects.get(id=id)
        res = ser.update(old_Product, req.data)
        return Response('upd')
