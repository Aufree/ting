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
      self.initReplyUser()
      self.initRainyDay()
      self.initAutocompleteAtUser()
      return

    sitePageUpdate: ->
      self = this
      self.initCloseMessage()
      # self.initGetNotificationsCount()
      self.initPlayer()
      return

    sitePageRestore: ->
      self = this
      self.initRemoveLoading()
      $('.ui.sticky').sticky('refresh');
      return

    # Run semantic ui
    initSemanticUiTools: ->
      $(".run-popup").popup()
      $(".ui.selection.dropdown").dropdown()
      $('.ui.sticky').sticky({offset: 100, bottomOffset: 50, context: '#main'})

      $('.modal-toggle').click ->
        $('.song-form').modal('show')

      $('.forget-password').click ->
        $('.reset-pwd-form').modal('show')
        return false

      $('#song-loading').progress('increment')
      $('.dimmer-image').dimmer({on: 'hover'})
      $('.ui.radio.checkbox').checkbox()
      $('.secondary.menu').find('.item').click ->
        $('.item.active').removeClass('active')
        $(this).addClass('active')
        $('.status-panel').html('<div class="ui center aligned basic segment"><i class="spinner loading icon"></i>'+$('.secondary').data('loading')+'</div>')
      return

    # Avatar preview
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

    # Upload avatar
    initUploadAvatar: ->
      $("input#user_avatar").css "display", "none"
      $(".user-avatar-upload").click ->
        $(".upload-avatar").click()
        return
      return

    # Auto close message
    initCloseMessage: ->
      $(".message .close").on "click", ->
        $(this).closest(".message").fadeOut()
        return
      return

    # Player
    initPlayer: ->
      $('.playBtn').unbind('click')
      $('.playBtn').click ->
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
          play_icon.addClass('spinner loading')
          playMusic = (music) ->
            $.get 'http://inmusic.sinaapp.com/xiami_api/' + music, (data) ->
              if data
                $('.stop-rotate').removeClass 'stop-rotate'
                play_icon.removeClass('spinner loading')
                $('.rotating').removeClass 'rotating'
                self.siblings('.image').addClass 'rotating'
                self.parents('.image').addClass 'rotating'
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
          $audio.attr
            "src": ''
            "data-xiami_id": -1
          next_song.find('.playBtn').click()
        return
      return

    # Polling for change of notifications count
    initGetNotificationsCount: ->
      interval = null
      clearTimeout(interval)
      if $('#unread-count').length > 0
        interval = setTimeout (->
          $.post "/notifications/count", (data) ->
            if data > 0
              ( if data > 99 then '99' else data)
              $('#unread-count').addClass('red').text data
            return
          return
          ),30000
      return

    # Auto check whether the xiami id is exists
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
            $('#song-errors').addClass("animated zoomIn").html '<div id="error_explanation"><div class="ui success message center aligned segment">'+$('#xiami-errors').data('passed')+'</div></div>'
            return
          ).fail( -> 
            $('input#song_title').val("")
            $('input#song_artist').val('')
            $('#song-errors').addClass("animated bounceIn").html '<div id="error_explanation"><div class="ui error message center aligned segment">'+$('#xiami-errors').data('cant_fetch')+'</div></div>'
            return
          ).always ->
            $btn.removeClass 'loading'
            return
        else
          $('#song-errors').addClass("animated flash").html('<div id="error_explanation"><div class="ui error message center aligned segment">'+$('#xiami-errors').data('blank')+'</div></div>')
          $(this).removeClass 'loading'
        return
      return

    # Add the loading effects to the form
    initLoadingForm: ->
      $(':submit').click ->
        $('.ui.form').addClass "loading"

    # Customizing confirmation dialogs in Rails
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

    # When user click to go back, it should get a better works
    initRemoveLoading: ->
      $('.ui.form').removeClass "loading"

    # Infinite Scrolling
    initInfiniteScrolling: ->
      $('#pagination').css('display', 'none')
      $("#songs").infinitescroll
        loading:
          finishedMsg: '<div class="ui green inverted center aligned segment">'+$('#pagination').data('loaded')+'</div>'
          img: $('#songs').data('image')
          msgText: ""
        navSelector: "nav.pagination"
        nextSelector: "nav.pagination a[rel=next]"
        itemSelector: "#songs .songs-list"
        animate: false

    # Click to reply user
    initReplyUser: ->
      $('.reply-user').click '.reply', ->
        value = $('textarea').val()
        name = "@" + $(this).find('.reply').attr 'data-name'
        $('textarea').val(value + " " + name + " ")
        $('textarea').focus()

    # Auto complete at user
    initAutocompleteAtUser: ->
      at_users = []
      user = undefined
      $users = $(".author")
      i = 0

      while i < $users.length
        user = $users.eq(i).html()
        at_users.push user  if $.inArray(user, at_users) is -1
        i++
      $("textarea").textcomplete [
        mentions: at_users
        match: /\B@(\w*)$/
        search: (term, callback) ->
          callback $.map(@mentions, (mention) ->
            (if mention.indexOf(term) is 0 then mention else null)
          )
          return

        index: 1
        replace: (mention) ->
          "@" + mention + " "
      ],
        appendTo: "body"

    # Rainy day
    initRainyDay: ->
      image = document.getElementById("rainyday")
      if typeof(image) != 'undefined' and image != null
        image.onload = ->
          engine = new RainyDay(image: this)
          engine.rain [[
            3
            2
            2
          ]], 100
          return
        image.crossOrigin = "anonymous"

  window.Boker = Boker
  return
) jQuery

$(document).ready ->
  Boker.init()
  Boker.siteBootUp()
  return
