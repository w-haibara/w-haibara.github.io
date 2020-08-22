(module
  (type (;0;) (func (result i32)))
  (func (;0;) (type 0) (result i32)
    (local i32)
    i32.const 0
    i32.const 0
    i32.load offset=12
    local.tee 0
    i32.const 1
    i32.add
    i32.store offset=12
    local.get 0)
  (table (;0;) 0 funcref)
  (memory (;0;) 1)
  (export "memory" (memory 0))
  (export "count" (func 0))
  (data (;0;) (i32.const 12) "\00\00\00\00"))
