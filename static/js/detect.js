var ua = navigator.userAgent,
    pf = navigator.platform,
    ve = navigator.vendor;

FX.detect = {
    _init: function () {
        this.browser = this._searchString(this._dataBrowser) || "unknown";
        this.version = this._searchVersion(ua)
            || this._searchVersion(navigator.appVersion)
            || "unknown";
        this.OS = this._searchString(this.dataOS) || "unknown";
    },
    _searchString: function (data) {
        for (var i=0;i<data.length;i++)	{
            var dataString = data[i].s;
            this.versionSearchString = data[i].versionSearch || data[i].i;
            if (dataString) {
                if (dataString.indexOf(data[i].k) != -1)
                    return data[i].i;
            }else if (data[i].prop) return data[i].i;
        }
    },
    _searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
    _dataBrowser: [
        { s: ua, k: "Chrome", i: "Chrome" },
        { s: ua, k: "OmniWeb", versionSearch: "OmniWeb/", i: "OmniWeb" },
        { s: ve, k: "Apple", i: "Safari", versionSearch: "Version" },
        { prop: window.opera, i: "Opera", versionSearch: "Version" },
        { s: ve, k: "iCab", i: "iCab" },
        { s: ve, k: "KDE", i: "Konqueror" },
        { s: ua, k: "Firefox", i: "Firefox" },
        { s: ve, k: "Camino", i: "Camino" },
        { s: ua, k: "Netscape", i: "Netscape" },
        { s: ua, k: "MSIE", i: "IE", versionSearch: "MSIE" },
        { s: ua, k: "Gecko", i: "Mozilla", versionSearch: "rv" },
        { s: ua, k: "Mozilla", i: "Netscape", versionSearch: "Mozilla" }
    ],
    dataOS : [
        { s: pf, k: "Win", i: "Windows" },
        { s: pf, k: "Mac", i: "Mac" },
        { s: ua, k: "iPhone", i: "iPhone/iPod" },
        { s: pf, k: "Linux", i: "Linux" }
    ]

};
FX.detect._init();
