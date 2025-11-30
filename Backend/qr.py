import qrcode

url="https://persian-cafe.vercel.app/"

file_path="D:\\per cafe\\persianqr.png"

qr= qrcode.QRCode()
qr.add_data(url)

img= qr.make_image()
img.save(file_path)