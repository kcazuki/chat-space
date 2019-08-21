$(function(){  
  var search_list = $('#user-search-result');
  var member_list = $("#chat-group-users");
  
  //ユーザー候補
  function appendUser(user) {
    var html = `<div class='chat-group-user clearfix'>
                  <p class='chat-group-user__name'>${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }
  
  //ユーザー削除
  function appendUserName(user_name, user_id) {
    var html =`<div class='chat-group-user clearfix'>
                <input name='group[user_ids][]' type='hidden' value=${user_id}>
                <p class='chat-group-user__name'>${user_name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
    member_list.append(html);
  }
  
 
  //イベント
  $('#user-search-field').on('keyup', function (){
    $('#user-search-result').empty();
    var input = $('#user-search-field').val();
      $.ajax({
          type: 'GET',
          url: '/users',
          data: {keyword: input},
          dataType: 'json'
      })
        
      .done(function (users){
        if (users.length !== 0){
          users.forEach(function(user){
            var html = appendUser(user);
            $('#user-search-result').append(html);
          });
         }
         else {
          appendNoUser('一致るするユーザーはありません');
          }
        })

      .fail(function () {
        alert('ユーザーの検索に失敗しました');
      })
  });
  

  // 追加ボタンクリック時の処理
  $('#user-search-result').on('click', '.user-search-add', function () {
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    $(this).parent().remove();
    var html = appendUserName(user_name, user_id);
    return html;
  });

  // 削除ボタンクリック時の処理
  $('#chat-group-users').on('click', '.user-search-remove', function () {
    $(this).parent().remove();
  });

});