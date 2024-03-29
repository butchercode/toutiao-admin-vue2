import request from '@/utils/request'

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

export const deleteArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/${articleId}`
  })
}

export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: 'mp/v1_0/articles',
    params: {
      draft // 是否为草稿（true为是）
    },
    data
  })
}

export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/${articleId}`,
    params: {
      draft
    },
    data
  })
}

export const getArticle = articleId => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/${articleId}`
  })
}

export const updateCommentStatus = (articleId, allowComment) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}
