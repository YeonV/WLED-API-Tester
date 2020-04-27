let currentPosts = {};
let newPostId = null;
let newImgId = null;

const getPosts = () => {
  fetch('http://wled.ddns.net:82/WLED-CMS/wp-json/wp/v2/posts')
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
  fetch('http://wled.ddns.net:82/WLED-CMS/wp-json/wp/v2/posts')
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
  fetch('http://wled.ddns.net:82/WLED-CMS/wp-json/jwt-auth/v1/token', {
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
  fetch('http://wled.ddns.net:82/WLED-CMS/wp-json/wp/v2/posts', {
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
  fetch(`http://wled.ddns.net:82/WLED-CMS/wp-json/wp/v2/posts/${postid}`, {
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
const uploadImgToWP = () => {
  // console.log("FILENAME:", $(wpFeatImg)[0], $(wpFeatImg)[0].value);

  const formData = new FormData();
  const fileField = document.querySelector('input[type="file"]');
  formData.append('title', fileField.files[0].name);
  formData.append('content', fileField.files[0].name);
  formData.append('media[0]', fileField.files[0]);

  fetch('http://wled.ddns.net:82/WLED-CMS/wp-json/wp/v2/media', {
    method: 'POST',
    headers: {
      'Content-Disposition': `form-data; attachment; filename="${fileField.files[0].name}"`,
      Authorization: 'Bearer ' + token
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
  if (
    document.cookie.split(';').some(item => item.trim().startsWith('token='))
  ) {
    token = getCookieValue('token');

    fetch('http://wled.ddns.net:82/WLED-CMS/wp-json/wp/v2/media', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename=${$(wpFeatImg)[0].value}`,
        accept: 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: img
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(imgResponse) {
        console.log(imgResponse);
      });
  } else {
    getToken();
  }
};

$('#pixabayTrigger').on('click', () => {
  uploadImgToWP();
  return;
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
            uploadImgToWP();
          });
        });
      });
    });
});
