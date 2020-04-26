pushd ./src/views/seminar/posts/assets
file ./*/*.PNG
mogrify -resize 600x600 ./*/*.png
file ./*/*.png
popd
