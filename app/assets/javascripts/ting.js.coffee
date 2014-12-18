(($) ->
  Boker =
    init: ->
      self = this
      Bootup = ->
        self.siteBootUp()
        return

      PageUpdate = ->
        self.sitePageUpdate()
        return

      PageRestore = ->
        self.sitePageRestore()

      $(document).on "page:load", Bootup
      $(document).on "page:update", PageUpdate
      $(document).on "page:restore", PageRestore
      return

    siteBootUp: ->
      self = this
      self.initSemanticUiTools()
      self.initAvatarPreview()
      self.initUploadAvatar()
      self.initCheckXiamiInfo()
      self.initLoadingForm()
      self.initCustomDataConfirm()
      self.initInfiniteScrolling()
      self.initPlayer()
      return

    sitePageUpdate: ->
      self = this
      self.initCloseMessage()
      self.initGetNotificationsCount()
      return

    sitePageRestore: ->
      self = this
      self.initRemoveLoading()
      return

    initSemanticUiTools: ->
      $(".run-popup").popup()
      $(".ui.selection.dropdown").dropdown()
      $('.ui.sticky').sticky({offset: 100, bottomOffset: 50, context: '#main'})
      $('.modal-toggle').click ->
        $('.song-form').modal('show')
      $('#song-loading').progress('increment');
      return

    initAvatarPreview: ->
      $(document).ready ->
        AvatarPreview = (avatar) ->
          if avatar.files and avatar.files[0]
            reader = new FileReader()
            reader.onload = (e) ->
              $(".user-avatar").attr "src", e.target.result
              return
            reader.readAsDataURL avatar.files[0]
          return

        $(".upload-avatar").change ->
          AvatarPreview this
          return
        return
      return

    initUploadAvatar: ->
      $("input#user_avatar").css "display", "none"
      $(".user-avatar-upload").click ->
        $(".upload-avatar").click()
        return
      return

    initCloseMessage: ->
      $(".message .close").on "click", ->
        $(this).closest(".message").fadeOut()
        return
      return

    initPlayer: ->
      $('.album-pic').on "click", '.playBtn', ->
        self = $(this)
        play_icon = self.find('i.play')
        pause_icon = self.find('i.pause')
        $player = $('#player').get(0)
        $audio = $('audio')

        if $audio.attr('data-xiami_id') is $(this).attr 'data-xiami_id'
          if $player.paused
            $player.play()
            $('.rotating').removeClass 'stop-rotate'
            play_icon.removeClass('play').addClass 'pause'
          else
            $player.pause()
            $('.rotating').addClass 'stop-rotate'
            $('.pause').removeClass('pause').addClass 'play'
        else
          play_icon.addClass('spinner rotating')
          playMusic = (music) ->
            $.get 'http://inmusic.sinaapp.com/xiami_api/' + music, (data) ->
              if data
                $('.stop-rotate').removeClass 'stop-rotate'
                play_icon.removeClass('spinner rotating')
                $('.rotating').removeClass 'rotating'
                self.siblings('.image').addClass 'rotating'
                $audio.attr
                  "src": data.songurl
                  "data-xiami_id": data.id
                $('.pause').removeClass('pause').addClass 'play'
                play_icon.removeClass('play').addClass 'pause'
                $player.play()
              return
          playMusic($(this).data('xiami_id'))

        $audio.on 'ended', ->
          $('.rotating').removeClass 'rotating'
          $('.pause').removeClass('pause').addClass 'play'
          next_song = $(self).parents('.songs-list').next('.songs-list')
          if next_song.length > 0
            next_song.find('.playBtn').click()
          else
            $audio.attr
              "src": ''
              "data-xiami_id": -1
          return
        return
      return

    initGetNotificationsCount: ->
      if $('#unread-count').length > 0
        setTimeout (->
          $.post "/notifications/count", (data) ->
            if data > 0
              ( if data > 99 then '99' else data)
              $('#unread-count').addClass('red').text data
            return
          return
          ),30000
      return

    initCheckXiamiInfo: ->
      $('input#song_s_id').blur ->
        $('#song-errors').removeClass().html ""
        s_id = $('input#song_s_id').val()
        $btn = $(this)
        $btn.addClass 'loading'
        if s_id.length > 0
          $.get("http://inmusic.sinaapp.com/xiami_api/" + s_id, (data) ->
            # parse single quotation marks for song title
            title = data.title.replace(/&#39;/,"'")
            $('input#song_title').val(title)
            $('input#song_artist').val(data.singer)
            $('#song-errors').addClass("animated zoomIn").html '<div id="error_explanation"><div class="ui success message center">检测通过, 填写分享内容后即可发布</div></div>'
            return
          ).fail( -> 
            $('input#song_title').val("")
            $('input#song_artist').val('')
            $('#song-errors').addClass("animated bounceIn").html '<div id="error_explanation"><div class="ui error message center">未获取到该歌曲的相关信息</div></div>'
            return
          ).always ->
            $btn.removeClass 'loading'
            return
        else
          $('#song-errors').addClass("animated flash").html('<div id="error_explanation"><div class="ui error message center">请先填写虾米 ID</div></div>')
          $(this).removeClass 'loading'
        return
      return

    initLoadingForm: ->
      $(':submit').click ->
        $('.ui.form').addClass "loading"

    initCustomDataConfirm: ->
      $.rails.allowAction = (link) ->
        return true  unless link.attr("data-confirm")
        $.rails.showConfirmDialog link
        false

      $.rails.confirmed = (link) ->
        link.removeAttr "data-confirm"
        link.trigger "click.rails"

      $.rails.showConfirmDialog = (link) ->
        html = undefined
        message = undefined
        $(".confirm-modal").remove()
        message = link.attr("data-confirm")
        html = "<div class=\"ui modal small confirm-modal\"><div class=\"content\"><p>" + message + "</p></div><div class=\"actions\"><div class=\"ui negative button\">No</div><div class=\"ui positive right labeled icon button\">Yes<i class=\"checkmark icon\"></i></div></div></div>"
        $("body").append html
        $(".confirm-modal").modal "show"
        $(".confirm-modal .actions .positive").on "click", ->
          $.rails.confirmed link

    initRemoveLoading: ->
      $('.ui.form').removeClass "loading"

    initInfiniteScrolling: ->
      $('#pagination').css('display', 'none')
      $("#songs").infinitescroll
        loading:
          finishedMsg: '<div class="ui green message center">全部加载完毕</div>'
          img: '/assets/loading.gif'
          msgText: ""
        navSelector: "nav.pagination"
        nextSelector: "nav.pagination a[rel=next]"
        itemSelector: "#songs .songs-list"
        animate: false

  window.Boker = Boker
  return
) jQuery

$(document).ready ->
  Boker.init()
  Boker.siteBootUp()
  return
