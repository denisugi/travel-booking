{{-- Structured Data Partial --}}
{{-- Usage: @include('seo.structured-data', ['type' => 'blog|package', 'data' => $structuredData]) --}}

@if(isset($data) && $data)
    <script type="application/ld+json">
    {!! json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}
    </script>
@endif
