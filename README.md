pTab Nedir?
====

jQuery ile geliştirilmiş bir tab eklentisidir.

Nasıl Kullanılır?
====

İndireceğiniz pTab.js dosyasını sayfanıza jquery'den sonra dahil edip hemen aşağıdaki parametreler ile kullanmaya başlayabilirsiniz.

Tarayıcı Desteği
====

jQuery ile geliştirildiği için tüm tarayıcılarla uyumlu çalışmaktadır.

Kim Yaptı
====

Bu eklenti Tayfun Erbilen ve Mert Osman Başol tarafından hazırlanmıştır.

Standart HTML Yapısı
====

pTab'ı kullanabilmek için aşağıdaki standart html yapısına sahip olmanız gerekir.
```
<div class="tab">
    <ul class="tab-list">
        <li><a href="#">1. tab</a></li>
        <li><a href="#">2. tab</a></li>
        <li><a href="#">3. tab</a></li>
    </ul>
    <div class="tabContent">
        1. tab içeriği
    </div>
    <div class="tabContent">
        2. tab içeriği
    </div>
    <div class="tabContent">
        3. tab içeriği
    </div>
</div>
```

Zorunlu Parametreler
====

pTab'ın en basit kullanımında ihtiyaç duyduğu 3 temel parametre vardır ve bu parametrelerin belirtilmesi zorunludur.
```
$(".tab").pTab({
    pTab: '.tab-list',
    pTabElem: 'li',
    pContent: '.tabContent'
});
```
