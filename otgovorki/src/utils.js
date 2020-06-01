
async function registerUpvote(id, content, type) {
    let newData = await fetch(
                        '/api/generate/post',
                        {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({'id': id, 'content': content, 'type': type})
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Upvote registered!', data);
                            return data;
                        })
                        .catch(error => {
                            console.log('Error registering upvote: ', error);
                        });
    console.log('newData: ', newData)
    return newData;
}

export {registerUpvote}; 