pushd ./src/views/seminar/posts/assets
file ./*/*.PNG
mogrify -resize 100x100 ./*/*.PNG
file ./*/*.PNG
popd
