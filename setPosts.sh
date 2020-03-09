cd ./src/views/Library/posts/
echo "{ \"posts\":[" > posts.json
ls | grep .md | sed -e 's/.md//' | while read line; do echo \"${line}\",; done | sed '$s/.$//' >> posts.json
echo ]} >> posts.json

