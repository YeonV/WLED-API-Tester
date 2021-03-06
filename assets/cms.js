let currentPosts = {};
let newPostId = null;
let newImgId = null;
function uploadImageAsync(urlbase, uri, base64, token) {
  let apiUrl = urlbase + '/wp-json/wp/v2/media';
  let formData = new FormData();
  const fileField = document.querySelector('input[type="file"]');
  console.log('YY', fileField.files[0]);
  formData.append('attachment', fileField.files[0]);
  //dynamically get file type

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  formData.append('file', {
    media: base64,
    name: `photo-yz.${fileType}`,
    type: `image/${fileType}`
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
      'Cache-Control': 'no-cache'
    }
  };

  console.log('header options: ', options);
  console.log('form-data options: ', formData);

  return fetch(apiUrl, options);
}
const getPosts = () => {
  fetch('https://wled.yeonv.com/wp-json/wp/v2/posts')
    .then(function(response) {
      return response.json();
    })
    .then(function(posts) {
      currentPosts = posts;
      console.log('Got State:', currentState);
      $('.dev3 textarea#currentCMS')[0].value = JSON.stringify(
        currentPosts,
        null,
        4
      );
    });
};
const getPost = () => {
  fetch('https://wled.yeonv.com/wp-json/wp/v2/posts')
    .then(function(response) {
      return response.json();
    })
    .then(function(posts) {
      currentPosts = posts;
      console.log('Got State:', currentState);
      $('.dev3 textarea#currentCMS')[0].value = JSON.stringify(
        currentPosts[0],
        null,
        4
      );
    });
};

const getToken = () => {
  console.log('Getting Token for: ', $('#wpUser')[0].value);
  fetch('https://wled.yeonv.com/wp-json/jwt-auth/v1/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({
      username: $('#wpUser')[0].value,
      password: $('#wpPass')[0].value
    })
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(user) {
      console.log('BOOOM', user.token);
      document.cookie = `token=${user.token}`;
    });
};
function getCookieValue(a) {
  const b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}
$('#cms-get').on('click', () => {
  getPost();
});
let token;

const createPost = (title, content) => {
  console.log('CREATING NEW POST:', title);
  fetch('https://wled.yeonv.com/wp-json/wp/v2/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      title: title,
      content: content,
      status: 'publish'
    })
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(post) {
      console.log(post);
      newImgId = post.id;
    })
    .catch(error => {
      console.log('ERROR', error);
    });
};
const updatePostWithImg = (postid, imgid) => {
  fetch(`https://wled.yeonv.com/wp-json/wp/v2/posts/${postid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      featured_media: imgid
    })
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(post) {
      console.log(post);
    });
};

$('#cms-post').on('click', () => {
  if (
    document.cookie.split(';').some(item => item.trim().startsWith('token='))
  ) {
    token = getCookieValue('token');
  } else {
    getToken();
  }
  createPost($('#wpTitle')[0].value, $('#wpContent')[0].value);

  console.log('...');
});
$('#cms-post2').on('click', () => {
  if (
    document.cookie.split(';').some(item => item.trim().startsWith('token='))
  ) {
    token = getCookieValue('token');
  } else {
    getToken();
  }
  updatePostWithImg(newPostId, newImgId);
  console.log('...');
});
$('#dev-button7').on('click', () => {
  $('.dev3').each((i, ele) => {
    $(ele).toggle();
  });
  getPosts();
});

/*  PIXABAY  */
const toDataURL = url =>
  fetch(url)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
const saveBase64AsFile = (base64, fileName) => {
  let link = document.createElement('a');

  link.setAttribute('href', base64);
  link.setAttribute('download', fileName);
  link.click();
};
const uploadImgToWP = base64 => {
  console.log('FILENAME:', $(wpFeatImg)[0], $(wpFeatImg)[0].value);

  if (
    document.cookie.split(';').some(item => item.trim().startsWith('token='))
  ) {
    token = getCookieValue('token');
    console.log(
      '---->https://wled.yeonv.com',
      'test.png',

      token
    );
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    formData.append('attachment', fileField.files[0]);

    fetch('https://wled.yeonv.com/wp-json/wp/v2/media', {
      method: 'POST',
      headers: {
        'Content-Disposition': `form-data; attachment; filename="${fileField.files[0].name}"`,
        Authorization:
          'Basic ' + btoa(`${$('#wpUser')[0].value}:${$('#wpPass')[0].value}`)
      },
      body: formData
    })
      .then(response => response.json())
      .then(result => {
        if (result.data.status !== 200) {
          console.error('ERROR', result);
        } else {
          console.log('Success:', result);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    return;

    uploadImageAsync('https://wled.yeonv.com', 'test.png', base64, token);
    // fetch("https://wled.yeonv.com/wp-json/wp/v2/media", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "image/jpeg",
    //     "Content-Disposition": `attachment; filename=${$(wpFeatImg)[0].value}`,
    //     accept: "application/json",
    //     Authorization: "Bearer " + token
    //   },
    //   body: img
    // })
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(imgResponse) {
    //     console.log(imgResponse);
    //   });
  } else {
    getToken();
  }
};

$('#pixabayTrigger').on('click', () => {
  // uploadImgToWP();
  // return;
  $('#pixabayFrame').fadeIn();
  $('#pixabayWrapper').fadeIn();
  $('#pixabayFrame:not(#pixabayWrapper)').on('click', () => {
    $('#pixabayFrame').fadeOut();
  });
  let pixabayApiKey;
  if (
    document.cookie
      .split(';')
      .some(item => item.trim().startsWith('pixabayApiKey='))
  ) {
    pixabayApiKey = getCookieValue('pixabayApiKey');
  } else {
    pixabayApiKey = window.prompt('Gimme pixabayApiKey!');
    if (pixabayApiKey && pixabayApiKey.length > 3) {
      document.cookie = `pixabayApiKey=${pixabayApiKey}`;
    }
  }
  console.log('Using pixabayApiKey: ', pixabayApiKey);

  fetch(
    `https://pixabay.com/api/?key=${pixabayApiKey}&q=led&image_type=photo`,
    {
      method: 'GET'
    }
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(pics) {
      console.log('BOOOM', pics);
      $('#pixabayWrapper .pixa-grid').append(
        pics.hits.map(
          pic => `
        <div class="pixabayPic" data-url="${pic.largeImageURL}" style="background-image: url('${pic.previewURL}');"></div>
        `
        )
      );
      $('#pixabayWrapper .pixa-grid .pixabayPic').each((i, el) => {
        $(el).on('click', () => {
          toDataURL($(el).data('url')).then(dataUrl => {
            console.log('RESULT:', dataUrl);
            //saveBase64AsFile(dataUrl, 'effect_background');
            uploadImgToWP(dataUrl);
          });
        });
      });
    });
});
