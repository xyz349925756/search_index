document.addEventListener('DOMContentLoaded', () => {
    // 获取IP信息
    fetch('https://ipinfo.io/json?token=5bc64845425f19')
        .then(response => response.json())
        .then(data => {
            const ipInfo = document.getElementById('ip-info');
            ipInfo.innerHTML += `
                <tr>
                    <th>${data.ip}</th>
                    <td>${data.country}, ${data.region}, ${data.city}</td>
                    <td>${data.org}</td>
                </tr>
            `;
        });

    // 获取额外的IP信息
    fetch('https://api-v3.speedtest.cn/ip')
        .then(response => response.json())
        .then(data => {
            const ipInfo = document.getElementById('ip-info');
            if (data.code === 0 && data.data) {
                const ip = data.data.ip;
                const location = `${data.data.country}, ${data.data.province}, ${data.data.city}`;
                const isp = data.data.isp;

                ipInfo.innerHTML += `
                    <tr>
                        <th>${ip}</th>
                        <td>${location}</td>
                        <td>${isp}</td>
                    </tr>
                `;
            } else {
                ipInfo.innerHTML += `
                    <tr>
                        <td colspan="3">无法获取IP信息</td>
                    </tr>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching IP info:', error);
            const ipInfo = document.getElementById('ip-info');
            ipInfo.innerHTML += `
                <tr>
                    <td colspan="3">获取IP信息失败</td>
                </tr>
            `;
        });

    // 获取进一步的IP信息
    fetch('https://qifu-api.baidubce.com/ip/local/geo/v1/district')
        .then(response => response.json())
        .then(data => {
            const ipInfo = document.getElementById('ip-info');
            if (data.code === "Success" && data.data) {
                const ip = data.ip;
                const location = `${data.data.country}, ${data.data.prov},${data.data.city} `;
                const isp = data.data.owner;

                ipInfo.innerHTML += `
                    <tr>
                        <th>${ip}</th>
                        <td>${location}</td>
                        <td>${isp}</td>
                    </tr>
                `;
            } else {
                ipInfo.innerHTML += `
                    <tr>
                        <td colspan="3">无法获取进一步的IP信息</td>
                    </tr>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching further IP info:', error);
            const ipInfo = document.getElementById('ip-info');
            ipInfo.innerHTML += `
                <tr>
                    <td colspan="3">获取进一步的IP信息失败</td>
                </tr>
            `;
        });

    // 获取额外的IP信息
    fetch('https://pro.ip-api.com/json/?fields=16985625&key=EEKS6bLi6D91G1p')
        .then(response => response.json())
        .then(data => {
            const ipInfo = document.getElementById('ip-info');
            if (data.query) {
                const ip = data.query;
                const location = `${data.country}, ${data.regionName}, ${data.city}`;
                const isp = data.isp;

                ipInfo.innerHTML += `
                    <tr>
                        <th>${ip}</th>
                        <td>${location}</td>
                        <td>${isp}</td>
                    </tr>
                `;
            } else {
                ipInfo.innerHTML += `
                    <tr>
                        <td colspan="3">无法获取IP信息</td>
                    </tr>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching IP info from pro.ip-api:', error);
            const ipInfo = document.getElementById('ip-info');
            ipInfo.innerHTML += `
                <tr>
                    <td colspan="3">获取IP信息失败</td>
                </tr>
            `;
        });

    // 要检测连通性的网站
    const websites = [
        {name: '百度', url: 'https://www.baidu.com'},
        {name: '网易云音乐', url: 'https://music.163.com'},
        {name: 'GitHub', url: 'https://github.com'},
        {name: 'YouTube', url: 'https://www.youtube.com'},
		{name: '腾讯', url: 'https://www.qq.com'},
		{name: 'Microsoft', url: 'https://www.microsoft.com/zh-cn/'},
		{name: '我的网站', url: 'https://www.cloudb.pub'},
		{name: 'Google proxy', url: 'https://google.0256.us.kg'},
    ];

    const connectivityCheck = document.getElementById('connectivity-check');

    websites.forEach(site => {
        const start = new Date().getTime();
        const proxyUrl = `https://proxy.cloudb.us.kg/${encodeURIComponent(site.url)}`;
        
        fetch(proxyUrl)
            .then(response => {
                if (response.ok) {
                    const latency = new Date().getTime() - start;
                    connectivityCheck.innerHTML += `
                        <tr>
                            <th>${site.name}</th>
                            <td style="color: green;">在线</td>
                            <td class="latency">${latency}ms</td>
                        </tr>
                    `;
                } else {
                    connectivityCheck.innerHTML += `
                        <tr>
                            <th>${site.name}</th>
                            <td style="color: red;">响应错误</td>
                            <td>不可用</td>
                        </tr>
                    `;
                }
            })
            .catch(() => {
                connectivityCheck.innerHTML += `
                    <tr>
                        <th>${site.name}</th>
                        <td style="color: red;">离线</td>
                        <td>不可用</td>
                    </tr>
                `;
            });
    });
});



