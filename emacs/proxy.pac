//脚本说明：
//此脚本为公司内部网络访问规则匹配脚本，包括直连访问、通过特殊代理访问
//通过appproxy访问、通过idcproxy访问、通过webproxy访问等规则；
//脚本维护人：bobbyxie（谢波）、juanchaowang（王军朝）
//脚本最后修改日期：2012年-08月-21日
//最近一次修改内容：部分银行站点访问，走独立的一台代理，保证公网出口IP唯一
//主程序入口
function FindProxyForURL(url, host) 
{ 
	if(checkip(host))
	{
	//	alert(host);
	//	return "ip";
	if(QQIpDirect(url,host))			                  //以下部分公司内网Ip访问，走本地路由，不通过代理
	{
		return "DIRECT";
	}
	else if (IDCIpProxy(url,host))				          //以下部分公司IDC IP网段访问，走本地路由，不通过代理
	{
		return "DIRECT";
	}	
	else if (IDCIpIDCProxy(url,host))			          //以下公司IDC网段访问，需要通过idcproxy
	{
		return randomProxy();   			              //此函数为idc-proxy的负载均衡函数
	//	return "DIRECT";
	}
	else if (OADirect(url,host))				      //以下公司内网网段访问，走本地路由，不通过代理
	{
		  return "DIRECT";	   
	}
	else 
		 return "PROXY web-proxy.oa.com:8080";            //未匹配上述规则以外的IP及IP段请求均送往webproxy
	}
	else
	{
	//	alert(host);
	//	return "domain";
		
	if(QQDomainByProxy(url,host))                         //公司soso部分cdn资源请求需要通过webproxy
	{
		return "PROXY web-proxy.oa.com:8080";             
	}
	else if(Bank(url,host))			          //以下部分银行站点访问，走独立的一台代理，保证公网出口IP唯一
	{
		return "PROXY 10.11.8.82:8080";
	}
	else if(QQDomainDirect(url,host))			          //以下部分公司内网域名访问，走本地路由，不通过代理
	{
		return "DIRECT";
	}
	else if (DomainHKProxy(url,host))			          //以下特定域名访问默认通过特殊代理
	{
		return "PROXY web-proxyhk.oa.com:8080";     		
	}
	else if (IDCDomainDirect(url,host))			          //以下部分公司IDC域名访问，走本地路由，不通过代理
	{
		return "DIRECT";
	}
	else if (IDCDomainIDCProxy(url,host))			      //以下部分公司IDC域名访问需要通过idcproxy
	{
		return randomProxy();         			      	  
	}
	else if (DomainAppProxy(url,host))                    //管家下载补丁的特定域名走appproxy 
	{
		return "PROXY proxy.tencent.com:8080";            
	}
	else 
		 return "PROXY web-proxy.oa.com:8080";            //未匹配上述规则以外的域名请求均送往webproxy
	}
	
	//var host = dnsResolve(host)
	//if(!host)
	//{
	//	return "DIRECT";
	//}
} 

//公司soso部分cdn资源请求需要通过webproxy
function QQDomainByProxy(url,host)
{
	if (shExpMatch(host,"cache.soso.com")
	||shExpMatch(host,"pic1.soso.com")
	||shExpMatch(host,"pic2.soso.com")
	||shExpMatch(host,"pic3.soso.com")
	||shExpMatch(host,"pic4.soso.com")
	||shExpMatch(host,"pic5.soso.com")
	||shExpMatch(host,"pic6.soso.com")
	||shExpMatch(host,"pic7.soso.com")
	||shExpMatch(host,"pic8.soso.com")
	||shExpMatch(host,"piccache1.soso.com")
	||shExpMatch(host,"piccache2.soso.com")
	||shExpMatch(host,"piccache3.soso.com")
	||shExpMatch(host,"piccache4.soso.com")
	||shExpMatch(host,"pic.baike.soso.com")
	||shExpMatch(host,"pic.wenwen.soso.com")
	||shExpMatch(host,"p1.soso.com")
	||shExpMatch(host,"p2.soso.com")
	||shExpMatch(host,"p3.soso.com")
	||shExpMatch(host,"p4.soso.com")
	||shExpMatch(host,"pic0.map.soso.com")
	||shExpMatch(host,"pic1.map.soso.com")
	||shExpMatch(host,"pic2.map.soso.com")
	||shExpMatch(host,"pic3.map.soso.com")
	||shExpMatch(host,"bao.post.soso.com")
	||shExpMatch(host,"cache.post.soso.com")
	||shExpMatch(host,"p1.qstatic.com")
	||shExpMatch(host,"p2.qstatic.com")
	||shExpMatch(host,"p3.qstatic.com")
	||shExpMatch(host,"p4.qstatic.com")
	||shExpMatch(host,"soso.qstatic.com")
	||shExpMatch(host,"500wan.zone.tenpay.com")
	||shExpMatch(host,"2.y1y.net")
	||shExpMatch(host,"air.tenpay.com")
	)
		return 1;
	else 
		return 0;
}
//以下部分银行站点访问，走独立的一台代理，保证公网出口IP唯一
function Bank(url,host)
{
	if (shExpMatch(host,"*.boc.cn")
	||shExpMatch(host,"*.bocichina.com")
	||shExpMatch(host,"*.icbc.com.cn")
	||shExpMatch(host,"*.ccb.com")
	||shExpMatch(host,"*.abchina.com")
	||shExpMatch(host,"*.95599.cn")
	||shExpMatch(host,"*.cmbchina.com")
	||shExpMatch(host,"*.ecitic.com")
	||shExpMatch(host,"*.standardchartered.com.cn")
	||shExpMatch(host,"*.cebbank.com")
	||shExpMatch(host,"*.pingan.com")
	||shExpMatch(host,"*.staplesadvantage.cn")
	||shExpMatch(host,"*.psbc.com")
	||shExpMatch(host,"*.cgbchina.com")
	||shExpMatch(host,"*.gov.cn")
	||shExpMatch(host,"*.dccnet.com.cn")
	)
		return 1;
	else 
		return 0;
}
//以下部分公司内网域名访问，走本地路由，不通过代理
function QQDomainDirect(url,host)
{
	if (shExpMatch(host,"*.kitty.com")
	||shExpMatch(host,"*.tencent.com")
	||shExpMatch(host,"*.qq.com")
	||shExpMatch(host,"hao.qq.com")
	||shExpMatch(host,"*.soso.com")
	||shExpMatch(host,"*.paipai.com")
	||shExpMatch(host,"*.paipaiimg.com")
	||shExpMatch(host,"*.wgimg.com")
	||shExpMatch(host,"*.gtimg.cn")
	||shExpMatch(host,"*.gtimg.com")
	||shExpMatch(host,"*.qqmail.com")
	||shExpMatch(host,"*.tenpay.com")
	||shExpMatch(host,"*.qzone.com")
	||shExpMatch(host,"*.taotao.com")
	||shExpMatch(host,"*.qlogo.cn")
	||shExpMatch(host,"*.qpic.cn")
	||shExpMatch(host,"*.ibibo.com")
	||shExpMatch(host,"*.s1sf.com")
	||shExpMatch(host,"*.asanook.com")
	||shExpMatch(host,"*.fsanook.com")
	||shExpMatch(host,"*.sanook.com")
	||shExpMatch(host,"*.pengyou.com")
	||shExpMatch(host,"*.zing.vn")
	||shExpMatch(host,"*.qstatic.com")
	||shExpMatch(host,"*.vng.com.vn")
	||shExpMatch(host,"*.vinagame.com.vn")
	||shExpMatch(host,"*.3366.com")
	||shExpMatch(host,"*.qqgames.com")
	||shExpMatch(host,"qq.elong.com")
	||shExpMatch(host,"*.qplus.com")
	||shExpMatch(host,"*.duba.net")
	||shExpMatch(host,"*.pc120.com")
	||shExpMatch(host,"*.idqqimg.com")
	||shExpMatch(host,"*.iweibo2.com")
	||shExpMatch(host,"*.qqgameapp.com")
	||shExpMatch(host,"*.tr.com")
	||shExpMatch(host,"*.kuyoo.cn")
	||shExpMatch(host,"*.weiyun.com")
	||shExpMatch(host,"t.km")
	||shExpMatch(host,"*.imqq.com")
	||shExpMatch(host,"ecc.com")
	||shExpMatch(host,"*.ecc.com")
	||shExpMatch(host,"*.51buy.com")
	||shExpMatch(host,"localhost")
	)
		return 1;
	else 
		return 0;
}
//以下特定域名访问默认通过特殊代理
function DomainHKProxy(url,host)
{
	if (shExpMatch(host,"*.facebook.com")
    ||shExpMatch(host,"facebook.com")
	||shExpMatch(host,"*.twitter.com")
	||shExpMatch(host,"twitter.com")
	||shExpMatch(host,"*.twimg.com")
	||shExpMatch(host,"twimg.com")
	||shExpMatch(host,"*.twitpic.com")
	||shExpMatch(host,"*.twitpic.com")
	||shExpMatch(host,"*.fbcdn.net")
	||shExpMatch(host,"*.gstatic.com")
	||shExpMatch(host,"gstatic.com")
	||shExpMatch(host,"*.rd.yahoo.com")
	||shExpMatch(host,"*.gamer.com.tw")
	||shExpMatch(host,"*.plurk.com")
	||shExpMatch(host,"*.ptt.cc")
	||shExpMatch(host,"*.yam.com")
	||shExpMatch(host,"ping.fm")
	||shExpMatch(host,"*.twitiq.com")
	||shExpMatch(host,"*.hootsuite.com")
	||shExpMatch(host,"*.booking.com")
	||shExpMatch(host,"*.e3expo.com")
	||shExpMatch(host,"*.careerbuilder.com")
	||shExpMatch(host,"*.dice.com")
	||shExpMatch(host,"*.wharton.upenn.edu")
	||shExpMatch(host,"*.bus.umich.edu")
	||shExpMatch(host,"*.northwestern.edu")
	||shExpMatch(host,"*.insead.edu")
	||shExpMatch(host,"*.mitsloan.mit.edu")
	||shExpMatch(host,"*.glassdoor.com")
	||shExpMatch(host,"*.paypal.com")
	||shExpMatch(host,"*.amazon.com")
	||shExpMatch(host,"*.insidesocialgame.com")
	||shExpMatch(host,"*.windowslive.cn")
	||shExpMatch(host,"*.goldengame.com.tw")
	||shExpMatch(host,"*.ibibo.com")
	||shExpMatch(host,"*.badoo.com")
	||shExpMatch(host,"*.blizzard.com")
	||shExpMatch(host,"*.wowtaiwan.com.tw")
	||shExpMatch(host,"*.wow-europe.com")
	||shExpMatch(host,"*.worldofwarcraft.co.kr")
	||shExpMatch(host,"*.nate.com")
	//||shExpMatch(host,"*.naver.com")
	||shExpMatch(host,"*.wikipedia.org")
	||shExpMatch(host,"*.wowarmory.com")
	||shExpMatch(host,"*.xbox.com")
	||shExpMatch(host,"*.nexon.com")
	||shExpMatch(host,"*.verisign.com")
	||shExpMatch(host,"*.ku.edu")
	||shExpMatch(host,"*.milw0rm.com")
	||shExpMatch(host,"*.rootkit.com")
	||shExpMatch(host,"*.sysinternals.com")
	||shExpMatch(host,"*.codeguru.com")
	||shExpMatch(host,"*.hkjc.com")
	||shExpMatch(host,"*.scout.org.hk")
	||shExpMatch(host,"*.cnn.com")
	||shExpMatch(host,"*.newsweek.com")
	||shExpMatch(host,"*.ft.com")
	||shExpMatch(host,"*.guardian.co.uk")
	||shExpMatch(host,"*.boston.com")
	||shExpMatch(host,"*.imdb.com")
	||shExpMatch(host,"*.reuters.com")
	||shExpMatch(host,"*.cnbc.com")
	||shExpMatch(host,"*.e.nikkei.com")
	||shExpMatch(host,"*.money.cnn.com")
	||shExpMatch(host,"*.timesofindia.indiatimes.com")
	||shExpMatch(host,"*.nasdaq.com")
	||shExpMatch(host,"*.hosted.ap.org")
	||shExpMatch(host,"*.renaissancecapital.com")
	||shExpMatch(host,"*.afp.com")
	||shExpMatch(host,"*.football.guardian.co.uk")
	||shExpMatch(host,"*.football365.com")
	||shExpMatch(host,"*.home.skysports.com")
	||shExpMatch(host,"*.sport.independent.co.uk")
	||shExpMatch(host,"*.gazzetta.it")
	||shExpMatch(host,"*.corrieredellosport.it")
	||shExpMatch(host,"*.lastampa.it")
	||shExpMatch(host,"*.corriere.it")
	||shExpMatch(host,"*.marca.com")
	||shExpMatch(host,"*.bild.t-online.de")
	||shExpMatch(host,"*.kicker.de")
	||shExpMatch(host,"*.egotastic.com")
	||shExpMatch(host,"*.tmz.com")
	||shExpMatch(host,"*.af.mil")
	||shExpMatch(host,"*.navy.mil")
	||shExpMatch(host,"*.voanews.com")
	||shExpMatch(host,"voanews.com")
	||shExpMatch(host,"*.google.com.hk")
	||shExpMatch(host,"*.google.com")
	||shExpMatch(host,"google.com")
	||shExpMatch(host,"google.com.cn")
	||shExpMatch(host,"*.google.com.cn")
	||shExpMatch(host,"google.cn")
	||shExpMatch(host,"*.google.cn")
	||shExpMatch(host,"googlecode.com")
	||shExpMatch(host,"*.googlecode.com")
	||shExpMatch(host,"*.conferencing.com")
	||shExpMatch(host,"*.reuters.com")
	||shExpMatch(host,"*.afp-direct.com")
	||shExpMatch(host,"*.tinychat.com")
	||shExpMatch(host,"tinychat.com")
	||shExpMatch(host,"*.google-analytics.com")
	||shExpMatch(host,"*.gamebase.com.tw")
	||shExpMatch(host,"*.play168.com.tw")
	||shExpMatch(host,"*.gbc.tw")
	||shExpMatch(host,"*.unalis.com.tw")
	||shExpMatch(host,"*.dropbox.com")
	||shExpMatch(host,"zlib.net")
	||shExpMatch(host,"*.zlib.net")
	||shExpMatch(host,"*.libpng.org")
	||shExpMatch(host,"*.wikimedia.org")
	||shExpMatch(host,"*.gailly.net")
	||shExpMatch(host,"*.lacitylimo.com")
	||shExpMatch(host,"*udn.com")
	||shExpMatch(host,"*.udn.com")
	||shExpMatch(host,"*.want-daily.com")
	||shExpMatch(host,"*audioview.conferencing.com")
	||shExpMatch(host,"*.emarketer.com")
	||shExpMatch(host,"*.appspot.com")
	||shExpMatch(host,"appspot.com")
	||shExpMatch(host,"fibaasia.net")
	||shExpMatch(host,"*.fibaasia.net")
	||shExpMatch(host,"yfrog.com")
	||shExpMatch(host,"*.yfrog.com")
	||shExpMatch(host,"*.blogspot.com")
	||shExpMatch(host,"*.feedburner.com")
	||shExpMatch(host,"*.blogblog.com")
	||shExpMatch(host,"*.blogger.com")
	||shExpMatch(host,"*.ytimg.com")
	||shExpMatch(host,"chromium.org")
	||shExpMatch(host,"*.chromium.org")
	||shExpMatch(host,"*.yiiframework.com")
	||shExpMatch(host,"*.t.co")
	||shExpMatch(host,"t.co")
	||shExpMatch(host,"*.hulu.com")
	||shExpMatch(host,"hulu.com")
	||shExpMatch(host,"*.huluim.com")
	||shExpMatch(host,"hulu.com")
	||shExpMatch(host,"*.facebook.net")
	||shExpMatch(host,"facebook.net")
	||shExpMatch(host,"*.zgncdn.com")
	||shExpMatch(host,"*.castleagegame.com")
	||shExpMatch(host,"castleagegame.com")
	||shExpMatch(host,"*.playfish.com")
	||shExpMatch(host,"*.cloudfront.net")
	||shExpMatch(host,"cloudfront.net")
	||shExpMatch(host,"*.googleusercontent.com")
	||shExpMatch(host,"*.thestar.com")
	||shExpMatch(host,"thestar.com")
	||shExpMatch(host,"*.cloudapp.net")
	||shExpMatch(host,"cloudapp.net")
	||shExpMatch(host,"*.knorex.asia")
	||shExpMatch(host,"knorex.asia")
	||shExpMatch(host,"*.mnet.com")
	||shExpMatch(host,"mnet.com")
	||shExpMatch(host,"*.me2day.com")
	||shExpMatch(host,"me2day.com")
	||shExpMatch(host,"*.bizspring.net")
	||shExpMatch(host,"discuss.com.hk")
	||shExpMatch(host,"*.discuss.com.hk")
	||shExpMatch(host,"*.mytour.com.hk")
	||shExpMatch(host,"*.i1.hk")
	||shExpMatch(host,"i1.hk")
	||shExpMatch(host,"*.pixelinteractivemedia.com")
	||shExpMatch(host,"hkg1.aastocks.com")
	||shExpMatch(host,"*.nasa.gov")
	||shExpMatch(host,"*.wretch.cc")
	||shExpMatch(host,"*.bocionline.com")
	||shExpMatch(host,"*.tipo.gov.tw")
	||shExpMatch(host,"*.insidefacebook.com")
	||shExpMatch(host,"*.sixjoy.com")
	||shExpMatch(host,"*.slideshare.net")
	||shExpMatch(host,"*.slidesharecdn.com")
	||shExpMatch(host,"*.wiki.kernel.org")
	||shExpMatch(host,"wiki.kernel.org")
	)
		return 1;
	else 
		return 0;
}
//以下部分公司IDC域名访问，走本地路由，不通过代理
function IDCDomainDirect(url,host)
{
	if (shExpMatch(host,"*.oa.com")
	||shExpMatch(host,"*.itil.com")
	||shExpMatch(host,"*.fms.com")
	||shExpMatch(host,"*.soc.com")
	||shExpMatch(host,"*.paipaioa.com")
	||shExpMatch(host,"ce.qqbrowser.local")
	||shExpMatch(host,"demo.ieg.local")
	||shExpMatch(host,"www.ieg.local")
	||shExpMatch(host,"tig.ieg.local")
	||shExpMatch(host,"qb.oss.com")
	||shExpMatch(host,"qt.oss.com")
	||shExpMatch(host,"sh.cm.com")
	||shExpMatch(host,"*.cm.com")
	||shExpMatch(host,"*.isd.com")
	||shExpMatch(host,"*.imd.com")
	||shExpMatch(host,"*.wsd.com")
	||shExpMatch(host,"*.3gqq.com")
	||shExpMatch(host,"*.ied.com")
	||shExpMatch(host,"*.mqq.com")
	||shExpMatch(host,"*.qqinternal.com")
	||shExpMatch(host,"tsc.cm.com")
	||shExpMatch(host,"ipcc.cm.com")
	||shExpMatch(host,"cd.cm.com")
	||shExpMatch(host,"testvpayok.cm.com")
	||shExpMatch(host,"mgp.cm.com")
	||shExpMatch(host,"chameleon.cm.com")
	||shExpMatch(host,"xplat.cm.com")
	||shExpMatch(host,"cf.cm.com")
	||shExpMatch(host,"cf-t.cm.com")
	||shExpMatch(host,"*.boss.com")
	||shExpMatch(host,"qfs.sng.local")
	||shExpMatch(host,"qbadmin.cm.com")
	||shExpMatch(host,"testvpay.cm.com")
	||shExpMatch(host,"adtest.addev.com")
	||shExpMatch(host,"admintest.addev.com")
	||shExpMatch(host,"testarps.addev.com")
	||shExpMatch(host,"mobileadwinmgrtest.addev.com")
	||shExpMatch(host,"testacms.addev.com")
	||shExpMatch(host,"adwinmanagertest.addev.com")
	||shExpMatch(host,"arps-carlos.addev.com")
	||shExpMatch(host,"adwinapidemo.addev.com")
	||shExpMatch(host,"adwin.addev.com")
	||shExpMatch(host,"acrm.addev.com")
	||shExpMatch(host,"testcoral.addev.com")
	||shExpMatch(host,"testwiki.addev.com")
	||shExpMatch(host,"mobwin.addev.com")
	||shExpMatch(host,"testads.addev.com")
	||shExpMatch(host,"testadmin.addev.com")
	||shExpMatch(host,"tracy59.addev.com")
	||shExpMatch(host,"*.test.addev.com")
	||shExpMatch(host,"mobwintest.addev.com")
	||shExpMatch(host,"acmsicy.addev.com")
	||shExpMatch(host,"to.addev.com")
	||shExpMatch(host,"demi.addev.com")
	||shExpMatch(host,"acmscarl.addev.com")
	||shExpMatch(host,"adc_dev.webdev.com")
	||shExpMatch(host,"*.webdev.com")
	||shExpMatch(host,"test.webdev.com")
	||shExpMatch(host,"blog.webdev.com")
	||shExpMatch(host,"*.webdev.com")
	||shExpMatch(host,"auto.webdev.com")
	||shExpMatch(host,"passport.webdev.com")
	||shExpMatch(host,"*.houseapp.webdev.com")
	||shExpMatch(host,"houseapp.webdev.com")
	||shExpMatch(host,"*.autoapp.webdev.com")
	||shExpMatch(host,"autoapp.webdev.com")
	||shExpMatch(host,"autoapp.qqinternal.com")
	||shExpMatch(host,"datalib.qqinternal.com")
	||shExpMatch(host,"sqqauth.mqq.com")
	||shExpMatch(host,"wx.cm.com")
	||shExpMatch(host,"ieodcc.cm.com")
	||shExpMatch(host,"cc.ied.com")
	||shExpMatch(host,"tms.ied.com")
	||shExpMatch(host,"webplat.ied.com")
	||shExpMatch(host,"qzonevas.cm.com")
	||shExpMatch(host,"club.cm.com")
	||shExpMatch(host,"obpaipai.cm.com")
	||shExpMatch(host,"gmtwo-tool.cm.com")
	||shExpMatch(host,"tejia.cm.com")
	||shExpMatch(host,"pet2admin214.cm.com")
	||shExpMatch(host,"service.cm.com")
	||shExpMatch(host,"pf.cm.com")
	||shExpMatch(host,"test.tr.com")
	||shExpMatch(host,"itiltest.tr.com")
	||shExpMatch(host,"trojanupload.tr.com")
	||shExpMatch(host,"*.snsdev.isd.com")
	||shExpMatch(host,"*.snsad.isd.com")
	||shExpMatch(host,"snsdev.isd.com")
	||shExpMatch(host,"snsad.isd.com")
	||shExpMatch(host,"ars.isd.com")
	||shExpMatch(host,"att.isd.com")
	||shExpMatch(host,"webteam.isd.com")
	||shExpMatch(host,"*.cmdb.isd.com")
	||shExpMatch(host,"www.m.com")
	||shExpMatch(host,"bbs.mqq.com")
	||shExpMatch(host,"csknow.cm.com")
	||shExpMatch(host,"soc.cm.com")
	||shExpMatch(host,"club-davy.cm.com")
	||shExpMatch(host,"tcss.cm.com")
	||shExpMatch(host,"qqbuy.cm.com")
	||shExpMatch(host,"operation.cm.com")
	||shExpMatch(host,"oad.cm.com")
	||shExpMatch(host,"mock.qqbuy.cm.com")
	||shExpMatch(host,"bread.cm.com")
	||shExpMatch(host,"bread1.cm.com")
	||shExpMatch(host,"scm.cm.com")
	||shExpMatch(host,"kbs.cm.com")
	||shExpMatch(host,"hm.cm.com")
	||shExpMatch(host,"legos.cm.com")
	||shExpMatch(host,"*.arm.addev.com")
	||shExpMatch(host,"rdm.wsd.com")
	||shExpMatch(host,"rdm2.wsd.com")
	||shExpMatch(host,"ci.wsd.com")
	||shExpMatch(host,"witp.wsd.com")
	||shExpMatch(host,"dist.3gqq.com")
	||shExpMatch(host,"www.3gqq.com")
	||shExpMatch(host,"infomanager.3gqq.com")
	||shExpMatch(host,"*.taf.wsd.com")
	||shExpMatch(host,"test.taf3.wsd.com")
	||shExpMatch(host,"union.oss.isoso.com")
	||shExpMatch(host,"ci.isoso.com")
	||shExpMatch(host,"testdb.isoso.com")
	||shExpMatch(host,"rmsci.isoso.com")
	||shExpMatch(host,"faxin.oss.isoso.com")
	||shExpMatch(host,"union.oss.isoso.com")
	||shExpMatch(host,"nlog.server.com")
	||shExpMatch(host,"url.cn")
	||shExpMatch(host,"*.url.cn")
	||shExpMatch(host,"job.ied.com")
	||shExpMatch(host,"ijobs.ied.com")
	||shExpMatch(host,"admin.move.com")
	||shExpMatch(host,"*.t.server.com")
	||shExpMatch(host,"*.aastocks.com")
	||shExpMatch(host,"v.cm.com")
	||shExpMatch(host,"opr.cm.com")
	||shExpMatch(host,"shop.cm.com")
	||shExpMatch(host,"sam.cm.com")
	||shExpMatch(host,"smp.cm.com")
	||shExpMatch(host,"video.cm.com")
	||shExpMatch(host,"testv.cm.com")
	||shExpMatch(host,"pub2.cf.com")
	||shExpMatch(host,"admin2.cf.com")
	||shExpMatch(host,"auto.ied.com")
	||shExpMatch(host,"imonitor.ied.com")
	||shExpMatch(host,"imonitor-t.ied.com")
	||shExpMatch(host,"auto.ied.com")
	||shExpMatch(host,"img.3366img.com")
	||shExpMatch(host,"ied-ci")
	||shExpMatch(host,"ied-server2")
	||shExpMatch(host,"gopmp.cm.com")
	||shExpMatch(host,"*.matrix.cloud")
	)
		return 1;
	else 
		return 0;
}
//以下部分公司IDC域名访问需要通过idcproxy
function IDCDomainIDCProxy(url,host)
{
	if (shExpMatch(host,"*.m.com")
	||shExpMatch(host,"*.cdg.local")
	||shExpMatch(host,"*.ieg.local")
	||shExpMatch(host,"*.mig.local")
	||shExpMatch(host,"*.omg.local")
	||shExpMatch(host,"*.sng.local")
	||shExpMatch(host,"*.teg.local")
	||shExpMatch(host,"*.teg.local")
	||shExpMatch(host,"*.ecc.local")
	||shExpMatch(host,"*.qqbrowser.local")
	||shExpMatch(host,"*.ad.com")
	||shExpMatch(host,"*.addev.com")
	||shExpMatch(host,"*.aurora.com")
	||shExpMatch(host,"*.cdc.com")
	||shExpMatch(host,"*.datamine.com")
	||shExpMatch(host,"*.expochart.cn")
	||shExpMatch(host,"*.expovideo.cn")
	||shExpMatch(host,"*.great.com")
	||shExpMatch(host,"*.home.com")
	||shExpMatch(host,"*.hotbar.com")
	||shExpMatch(host,"*.ibg.com")
	||shExpMatch(host,"*.ierd.com")
	||shExpMatch(host,"*.imoss.com")
	||shExpMatch(host,"*.isoso.com")
	||shExpMatch(host,"*.oss.com")
	||shExpMatch(host,"*.otaworld.com")
	||shExpMatch(host,"*.paipaioa.com")
	||shExpMatch(host,"*.qqwork.com")
	||shExpMatch(host,"*.rtpre.com")
	||shExpMatch(host,"*.sc.oa.com")
	||shExpMatch(host,"*.sec.com")
	||shExpMatch(host,"*.tencentvoip.com")
	||shExpMatch(host,"*.vpn.com")
	||shExpMatch(host,"*.webdev.com")
	||shExpMatch(host,"*.webdev2.com")
	||shExpMatch(host,"admin2.cf.com")
	)
		return 1;
	else 
		return 0;
}

//以下部分公司内网IP访问，走本地路由，不通过代理
function QQIpDirect(url,host)
{
	if (isInNet(host, "221.130.15.91", "255.255.255.255")
	||isInNet(host, "221.130.15.25", "255.255.255.255")
	||isInNet(host, "221.130.15.44", "255.255.255.255")
	||isInNet(host, "221.130.15.46", "255.255.255.255")
	||isInNet(host, "221.130.15.33", "255.255.255.255")
	||isInNet(host, "221.130.15.93", "255.255.255.255")
	||isInNet(host, "221.130.24.13", "255.255.255.255")
	||isInNet(host, "221.130.15.172", "255.255.255.255")
	||isInNet(host, "221.130.15.240", "255.255.255.255")
	)
		return 1;
	else 
		return 0;
}

//以下部分公司IDC IP网段访问，走本地路由，不通过代理
function IDCIpProxy(url,host)
{
	if (isInNet(host, "172.25.0.0", "255.255.192.0")
	||isInNet(host, "172.30.0.0", "255.255.0.0")
	||isInNet(host, "172.16.0.0", "255.255.240.0")
	||isInNet(host, "172.18.0.0", "255.255.0.0")
	||isInNet(host, "10.0.0.0", "255.128.0.0")
	||isInNet(host, "10.130.27.87", "255.255.255.255")
	||isInNet(host, "10.166.133.174", "255.255.255.255")
	||isInNet(host, "172.16.56.27", "255.255.255.255")
	||isInNet(host, "172.27.5.51", "255.255.255.255")
	||isInNet(host, "172.16.56.27", "255.255.255.255")
	||isInNet(host, "172.16.180.43", "255.255.255.255")
	||isInNet(host, "172.27.5.97", "255.255.255.255")
	||isInNet(host, "172.17.73.15", "255.255.255.255")
	||isInNet(host, "172.17.73.16", "255.255.255.255")
	||isInNet(host, "172.25.6.161", "255.255.255.255")
	||isInNet(host, "172.20.6.95", "255.255.255.255")
	||isInNet(host, "172.20.6.57", "255.255.255.255")
	||isInNet(host, "172.20.6.94", "255.255.255.255")
	||isInNet(host, "172.25.40.73", "255.255.255.255")
	||isInNet(host, "172.20.6.76", "255.255.255.255")
	||isInNet(host, "172.16.225.244", "255.255.255.255")
	||isInNet(host, "172.16.180.147", "255.255.255.255")
	||isInNet(host, "172.23.1.149", "255.255.255.255")
	||isInNet(host, "172.16.244.254", "255.255.255.255")
	||isInNet(host, "172.23.32.11", "255.255.255.255")
	||isInNet(host, "172.23.4.138", "255.255.255.255")
	||isInNet(host, "10.161.2.214", "255.255.255.255")
	||isInNet(host, "172.22.10.181", "255.255.255.255")
	||isInNet(host, "172.22.10.177", "255.255.255.255")
	||isInNet(host, "172.22.10.178", "255.255.255.255")
	||isInNet(host, "172.22.10.0", "255.255.255.0")
	||isInNet(host, "10.135.0.212", "255.255.255.255")
	||isInNet(host, "10.128.65.175", "255.255.255.255")
	||isInNet(host, "10.128.35.184", "255.255.255.255")
	||isInNet(host, "10.128.64.108", "255.255.255.255")
	||isInNet(host, "10.128.64.109", "255.255.255.255")
	||isInNet(host, "10.128.64.107", "255.255.255.255")
	||isInNet(host, "172.23.10.148", "255.255.255.255")
	||isInNet(host, "172.27.6.51", "255.255.255.255")
	||isInNet(host, "10.130.87.39", "255.255.255.255")
	||isInNet(host, "10.130.91.36", "255.255.255.255")
	||isInNet(host, "10.134.145.12", "255.255.255.255")
	||isInNet(host, "10.134.9.177", "255.255.255.255")
	||isInNet(host, "10.134.9.173", "255.255.255.255")
	||isInNet(host, "10.134.9.175", "255.255.255.255")
	||isInNet(host, "10.137.140.217", "255.255.255.255")
	||isInNet(host, "10.132.135.27", "255.255.255.255")
	||isInNet(host, "172.20.12.230", "255.255.255.255")
	||isInNet(host, "172.22.2.227", "255.255.255.255")
	||isInNet(host, "10.6.207.197", "255.255.255.255")
	||isInNet(host, "10.147.22.158", "255.255.255.255")
	||isInNet(host, "10.130.64.219", "255.255.255.255")
	||isInNet(host, "10.1.164.188", "255.255.255.255")
	||isInNet(host, "10.128.160.235", "255.255.255.255")
	||isInNet(host, "192.168.75.0", "255.255.255.0")
	||isInNet(host, "10.136.1.32", "255.255.255.0")
	||isInNet(host, "10.130.36.84", "255.255.255.0")
	||isInNet(host, "172.25.85.116", "255.255.255.0")
	||isInNet(host, "172.25.9.21", "255.255.255.0")
	||isInNet(host, "10.130.14.74", "255.255.255.0")
	||isInNet(host, "10.136.13.91", "255.255.255.0")
	||isInNet(host, "10.136.8.47", "255.255.255.0")
	||isInNet(host, "172.27.33.141", "255.255.255.0")
	||isInNet(host, "10.166.133.174", "255.255.255.0")
	||isInNet(host, "172.23.61.147", "255.255.255.0")
	||isInNet(host, "172.23.33.31", "255.255.255.0")
	||isInNet(host, "172.16.83.170", "255.255.255.0")
	||isInNet(host, "172.25.69.221", "255.255.255.0")
	||isInNet(host, "172.27.39.169", "255.255.255.0")
	||isInNet(host, "172.23.152.39", "255.255.255.0")
	||isInNet(host, "172.27.33.246", "255.255.255.0")
	||isInNet(host, "10.137.138.109", "255.255.255.0")
	||isInNet(host, "10.129.130.49", "255.255.255.0")
	||isInNet(host, "10.156.50.20", "255.255.255.0")
	||isInNet(host, "10.143.133.177", "255.255.255.0")
	||isInNet(host, "10.130.150.88", "255.255.255.0")
	||isInNet(host, "10.185.9.152", "255.255.255.0")
	||isInNet(host, "10.179.5.108", "255.255.255.0")
	||isInNet(host, "10.148.137.96", "255.255.255.0")
	||isInNet(host, "10.129.128.245", "255.255.255.0")
	||isInNet(host, "10.129.128.243", "255.255.255.0")
	||isInNet(host, "10.129.128.244", "255.255.255.0")
	||isInNet(host, "10.129.132.179", "255.255.255.0")
	||isInNet(host, "10.130.135.22", "255.255.255.0")
	||isInNet(host, "10.130.134.84", "255.255.255.0")
	||isInNet(host, "10.130.135.24", "255.255.255.0")
	||isInNet(host, "10.148.147.151", "255.255.255.0")
	||isInNet(host, "10.148.147.156", "255.255.255.0")
	||isInNet(host, "10.134.7.174", "255.255.255.0")
	||isInNet(host, "10.136.151.79", "255.255.255.0")
	||isInNet(host, "172.18.33.174", "255.255.255.0")
	||isInNet(host, "10.171.28.49", "255.255.255.0")
	||isInNet(host, "10.171.28.50", "255.255.255.0")
	||isInNet(host, "10.187.19.214", "255.255.255.0")
	||isInNet(host, "10.180.55.33", "255.255.255.0")
	||isInNet(host, "10.152.14.82", "255.255.255.0")
	||isInNet(host, "10.130.69.152", "255.255.255.0")
	||isInNet(host, "192.168.75.0", "255.255.255.0")
	||isInNet(host, "127.0.0.0", "255.255.255.0")
	)
		return 1;
	else 
		return 0;
}
//以下公司IDC网段访问需要通过idcproxy
function IDCIpIDCProxy(url,host)
{
	if (isInNet(host, "172.16.0.0", "255.240.0.0")
	||isInNet(host, "192.168.0.0", "255.255.0.0")
	||isInNet(host, "10.0.0.0", "255.0.0.0")
//	||isInNet(host, "127.0.0.0", "255.255.255.0")
	)
		return 1;
	else 
		return 0;
}
//以下公司内网网段访问，走本地路由，不通过代理
function OADirect(url,host)
{
	if (isInNet(host, "192.168.0.0", "255.255.0.0")
	||isInNet(host, "10.0.0.0", "255.0.0.0")
	||isInNet(host, "172.0.0.0", "255.0.0.0")
	||isInNet(host, "127.0.0.0", "255.255.255.0")
	)
		return 1;
	else 
		return 0;
}
//管家下载补丁的特定域名走appproxy
function DomainAppProxy(url,host)
{
	if (shExpMatch(host,"tc.dlservice.microsoft.com"))
		return 1;
	else 
		return 0;
}
//以下公司内网网段访问，走本地路由，不通过代理
function randomProxy()
{
	switch( Math.floor( Math.random() * 2 ) )
	{
		case 0:
		return "PROXY idc1-proxy.oa.com:80; + PROXY idc1-proxy.oa.com:80";
		break;
		case 1:
		return "PROXY idc1-proxy.oa.com:80; + PROXY idc1-proxy.oa.com:80";
		break;
	}
}
//URL\IP判断函数
function MyIsInNet(host,ip1,ip2)
{
	if(!host)
	{
		return 0;
	}
	return isInNet(host, ip1, ip2);
}
function checkip(host)
{
	var pattern=/^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
	flag_ip=pattern.test(host);
	if(!flag_ip)
	{   
		return false;
	}
	else
	{
		return true;
	}
}