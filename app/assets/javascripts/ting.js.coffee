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

      $(document).on "page:load", Bootup
      $(document).on "page:update", PageUpdate
      return

    siteBootUp: ->
      self = this
      self.initSemanticUiTools()
      self.initAvatarPreview()
      self.initUploadAvatar()
      return

    sitePageUpdate: ->
      self = this
      self.initCloseMessage()
      return

    initSemanticUiTools: ->
      $(".user-avatar-upload").popup()
      $(".ui.selection.dropdown").dropdown()
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

  window.Boker = Boker
  return
) jQuery

$(document).ready ->
  Boker.init()
  Boker.siteBootUp()
  return
