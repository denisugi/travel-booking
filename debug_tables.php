<?php
$tables = DB::select("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
echo json_encode(array_map(fn($t) => $t->table_name, $tables));