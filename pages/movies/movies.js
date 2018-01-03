var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (event) {
    var inTeatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3';
    var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3';
    var top250Url = app.globalData.doubanBase + '/v2/movie/top250' + '?start=0&count=3';

    /*调用（异步，加载顺序先后不定）*/
    this.getMovieaListData(inTeatersUrl);
    this.getMovieaListData(comingSoonUrl);
    this.getMovieaListData(top250Url);
  },

  /*封装成请求函数，用来访问豆瓣API */
  getMovieaListData: function (url) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        // "Content-Type":"application/xml"
        "Content-Type": "json"
      },
      success: function (res) {
        /*'请求成功' */
        console.log(res);
        that.processDoubanData(res.data)
      },
      fail: function (error) {
        consoel.log('请求失败');
      },
    })
  },
  /*moviesDouban接收从上个函数传下来(即从豆瓣获取)的数据，用来做数据绑定
    这里的moviesDouban相当于res.data */
  processDoubanData: function (moviesDouban) {
    /*movies用来接收新数组 */
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    this.setData({
      movies: movies
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
