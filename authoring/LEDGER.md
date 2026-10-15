# Concept ledger

| # | file | kind | teaches | deepens |
|---|---|---|---|---|
| 1 | 00_intro/01_welcome.ts | complete |  |  |
| 2 | 00_intro/02_type_errors.ts | fix |  |  |
| 3 | 00_intro/03_asking_for_hints.ts | complete |  |  |
| 4 | 00_intro/04_a_program_is_a_value.ts | complete | Effect.succeed, Effect.runSync |  |
| 5 | 00_intro/05_nothing_runs_until_you_run_it.ts | complete | Effect.sync |  |
| 6 | 00_intro/06_the_effect_type.ts | fix | Effect.Effect |  |
| 7 | 01_words/01_run_promise.ts | complete | Effect.runPromise |  |
| 8 | 01_words/02_succeed_is_eager.ts | fix |  | Effect.succeed, Effect.sync, Effect.runSync |
| 9 | 01_words/03_fail.ts | complete | Effect.fail |  |
| 10 | 01_words/04_exit.ts | complete | Effect.runPromiseExit, Exit.Exit, Exit.isSuccess, Exit.isFailure |  |
| 11 | 01_words/05_promise.ts | complete | Effect.promise |  |
| 12 | 01_words/06_try_promise.ts | complete | Effect.tryPromise |  |
| 13 | 01_words/07_try.ts | complete | Effect.try |  |
| 14 | 01_words/08_suspend.ts | complete | Effect.suspend |  |
| 15 | 01_words/09_void.ts | complete | Effect.void |  |
| 16 | 01_words/10_callback.ts | complete | Effect.callback |  |
| 17 | 01_words/11_sleep.ts | complete | Effect.sleep |  |
| 18 | 01_words/12_translate_sync_functions.ts | translate |  | Effect.sync, Effect.try |
| 19 | 01_words/13_translate_promise_apis.ts | translate |  | Effect.promise, Effect.tryPromise |
| 20 | 01_words/14_translate_callback_apis.ts | translate |  | Effect.callback |
| 21 | 01_words/15_capstone_pick_the_constructor.ts | translate |  | Effect.succeed, Effect.sync, Effect.fail, Effect.promise, Effect.tryPromise, Effect.try, Effect.void |
| 22 | 02_grammar/01_map.ts | complete | Effect.map, .pipe |  |
| 23 | 02_grammar/02_map_two_spellings.ts | complete |  | Effect.map, .pipe |
| 24 | 02_grammar/03_pipe_function.ts | complete | pipe |  |
| 25 | 02_grammar/04_map_chain.ts | complete |  | Effect.map, .pipe |
| 26 | 02_grammar/05_flat_map.ts | complete | Effect.flatMap |  |
| 27 | 02_grammar/06_map_or_flat_map.ts | fix |  | Effect.map, Effect.flatMap |
| 28 | 02_grammar/07_gen.ts | complete | Effect.gen, yield* |  |
| 29 | 02_grammar/08_gen_many_steps.ts | complete |  | Effect.gen, yield* |
| 30 | 02_grammar/09_gen_control_flow.ts | complete |  | Effect.gen, yield* |
| 31 | 02_grammar/10_forgot_yield.ts | fix |  | Effect.gen, yield* |
| 32 | 02_grammar/11_tap.ts | complete | Effect.tap |  |
| 33 | 02_grammar/12_as.ts | complete | Effect.as, Effect.asVoid |  |
| 34 | 02_grammar/13_zip.ts | complete | Effect.zip |  |
| 35 | 02_grammar/14_all_tuple.ts | complete | Effect.all |  |
| 36 | 02_grammar/15_all_struct.ts | complete |  | Effect.all |
| 37 | 02_grammar/16_for_each.ts | complete | Effect.forEach |  |
| 38 | 02_grammar/17_failure_short_circuits.ts | complete |  | Effect.gen, yield*, Effect.fail, Effect.runPromiseExit, Exit.isFailure |
| 39 | 02_grammar/18_fn.ts | complete | Effect.fn |  |
| 40 | 02_grammar/19_fn_calls_fn.ts | complete |  | Effect.fn, yield* |
| 41 | 02_grammar/20_fn_with_combinators.ts | complete |  | Effect.fn, Effect.map, Effect.tap |
| 42 | 02_grammar/21_fn_untraced.ts | complete | Effect.fnUntraced |  |
| 43 | 02_grammar/22_translate_then_chain.ts | translate |  | Effect.flatMap, Effect.map, .pipe |
| 44 | 02_grammar/23_translate_async_await.ts | translate |  | Effect.fn, Effect.gen, yield* |
| 45 | 02_grammar/24_translate_promise_all.ts | translate |  | Effect.all, Effect.forEach |
| 46 | 02_grammar/25_capstone_receipt.ts | complete |  | Effect.fn, Effect.forEach, Effect.all, Effect.fail, Effect.succeed, yield* |
| 47 | 03_types/01_reading_the_success_type.ts | fix | Effect.Success |  |
| 48 | 03_types/02_reading_the_error_type.ts | fix | Effect.Error |  |
| 49 | 03_types/03_reading_the_requirements.ts | fix | Effect.Services |  |
| 50 | 03_types/04_all_three_slots.ts | fix |  |  |
| 51 | 03_types/05_errors_add_up.ts | fix |  | Effect.Error, Effect.gen, Effect.fail, Effect.runPromiseExit, Exit.isFailure |
| 52 | 03_types/06_map_error.ts | complete | Effect.mapError |  |
| 53 | 03_types/07_or_die.ts | complete | Effect.orDie |  |
| 54 | 03_types/08_exit_as_a_value.ts | complete | Effect.exit |  |
| 55 | 03_types/09_unmet_requirements.ts | fix | Effect.provideService |  |
| 56 | 03_types/10_providing_shrinks_r.ts | complete |  | Effect.provideService, Effect.Services |
| 57 | 03_types/11_run_sync_or_promise.ts | fix |  | Effect.runSync, Effect.runPromise, Effect.sleep |
| 58 | 03_types/12_fixing_a_signature.ts | fix |  | Effect.provideService, Effect.gen, Effect.fail |
| 59 | 03_types/13_fn_return_type.ts | fix |  | Effect.fn |
| 60 | 03_types/14_accepting_failing_effects.ts | fix |  | Effect.Effect, Effect.runPromise, Effect.fail |
| 61 | 03_types/15_capstone_signatures.ts | complete |  | Effect.fn, Effect.provideService, Effect.Services, Effect.fail, yield* |
| 62 | 04_errors/01_tagged_error.ts | fix | Data.TaggedError |  |
| 63 | 04_errors/02_fail_with_a_tagged_error.ts | complete |  | Effect.fail, Effect.succeed, Data.TaggedError |
| 64 | 04_errors/03_yield_an_error.ts | complete |  | yield*, Data.TaggedError, Effect.fn |
| 65 | 04_errors/04_catch.ts | complete | Effect.catch |  |
| 66 | 04_errors/05_catch_can_fail_again.ts | complete |  | Effect.catch, Effect.fail, Effect.succeed |
| 67 | 04_errors/06_catch_tag.ts | complete | Effect.catchTag |  |
| 68 | 04_errors/07_catch_tag_narrows_e.ts | fix |  | Effect.catchTag, Effect.Error |
| 69 | 04_errors/08_catch_tag_many.ts | complete |  | Effect.catchTag |
| 70 | 04_errors/09_catch_tags.ts | complete | Effect.catchTags |  |
| 71 | 04_errors/10_catch_if.ts | complete | Effect.catchIf |  |
| 72 | 04_errors/11_or_else_succeed.ts | complete | Effect.orElseSucceed |  |
| 73 | 04_errors/12_match.ts | complete | Effect.match |  |
| 74 | 04_errors/13_tap_error.ts | complete | Effect.tapError |  |
| 75 | 04_errors/14_keep_the_cause.ts | complete |  | Effect.tryPromise, Data.TaggedError |
| 76 | 04_errors/15_result_as_data.ts | complete | Effect.result |  |
| 77 | 04_errors/16_ignore.ts | complete | Effect.ignore |  |
| 78 | 04_errors/17_filter_or_fail.ts | complete | Effect.filterOrFail |  |
| 79 | 04_errors/18_partition.ts | complete | Effect.partition |  |
| 80 | 04_errors/19_fail_vs_die.ts | complete | Effect.die, Cause.hasFails, Cause.hasDies |  |
| 81 | 04_errors/20_predict_a_throw.ts | complete |  | Effect.sync, Effect.gen, Effect.try, Effect.die |
| 82 | 04_errors/21_try_catch_does_not_catch.ts | fix |  | Effect.catch, Effect.gen, yield* |
| 83 | 04_errors/22_catch_defect.ts | complete | Effect.catchDefect |  |
| 84 | 04_errors/23_or_die_for_impossible.ts | complete |  | Effect.orDie |
| 85 | 04_errors/24_catch_cause.ts | complete | Effect.catchCause, Cause.isFailReason, Cause.isDieReason |  |
| 86 | 04_errors/25_exit_match.ts | complete | Exit.match |  |
| 87 | 04_errors/26_catch_reason.ts | complete | Effect.catchReason |  |
| 88 | 04_errors/27_translate_error_classes.ts | translate |  | Effect.catchTags, Effect.map, Data.TaggedError |
| 89 | 04_errors/28_translate_promise_catch.ts | translate |  | Effect.orElseSucceed, Effect.match |
| 90 | 04_errors/29_capstone_checkout.ts | complete |  | Data.TaggedError, Effect.fn, Effect.catchTags, yield* |
| 91 | 05_data/01_option_some_none.ts | complete | Option.Option, Option.some, Option.none |  |
| 92 | 05_data/02_is_some.ts | complete | Option.isSome, Option.isNone |  |
| 93 | 05_data/03_from_nullish.ts | complete | Option.fromNullishOr |  |
| 94 | 05_data/04_map_and_get_or_else.ts | complete | Option.map, Option.getOrElse |  |
| 95 | 05_data/05_option_match.ts | complete | Option.match |  |
| 96 | 05_data/06_option_flat_map.ts | complete | Option.flatMap |  |
| 97 | 05_data/07_filter_and_or_else.ts | complete | Option.filter, Option.orElse |  |
| 98 | 05_data/08_option_all.ts | complete | Option.all |  |
| 99 | 05_data/09_effect_from_option.ts | complete | Effect.fromOption |  |
| 100 | 05_data/10_effect_option.ts | complete | Effect.option |  |
| 101 | 05_data/11_result_basics.ts | complete | Result.Result, Result.succeed, Result.fail, Result.isSuccess, Result.isFailure |  |
| 102 | 05_data/12_result_map_and_match.ts | complete | Result.map, Result.match |  |
| 103 | 05_data/13_result_try.ts | complete | Result.try |  |
| 104 | 05_data/14_result_flat_map.ts | complete | Result.flatMap |  |
| 105 | 05_data/15_effect_and_result.ts | complete | Effect.fromResult | Effect.result |
| 106 | 05_data/16_arr_head_and_last.ts | complete | Arr.head, Arr.last |  |
| 107 | 05_data/17_arr_find_first.ts | complete | Arr.findFirst |  |
| 108 | 05_data/18_arr_group_by.ts | complete | Arr.groupBy |  |
| 109 | 05_data/19_arr_sort.ts | complete | Arr.sort, Order.Number, Order.String |  |
| 110 | 05_data/20_order_map_input.ts | complete | Order.mapInput |  |
| 111 | 05_data/21_arr_dedupe_chunks.ts | complete | Arr.dedupe, Arr.chunksOf |  |
| 112 | 05_data/22_arr_partition.ts | complete | Arr.partition |  |
| 113 | 05_data/23_rec_get_and_map.ts | complete | Rec.get, Rec.map |  |
| 114 | 05_data/24_rec_entries_and_filter.ts | complete | Rec.fromEntries, Rec.filter, Rec.keys |  |
| 115 | 05_data/25_data_class.ts | fix | Data.Class, Equal.equals |  |
| 116 | 05_data/26_tagged_enum.ts | complete | Data.TaggedEnum, Data.taggedEnum |  |
| 117 | 05_data/27_match_type.ts | complete | Match.type, Match.tag, Match.exhaustive |  |
| 118 | 05_data/28_match_is_exhaustive.ts | fix |  | Match.type, Match.tag, Match.exhaustive |
| 119 | 05_data/29_match_when.ts | complete | Match.value, Match.when, Match.string, Match.number, Match.orElse |  |
| 120 | 05_data/30_duration_basics.ts | complete | Duration.Duration, Duration.millis, Duration.seconds, Duration.minutes, Duration.sum, Duration.toMillis |  |
| 121 | 05_data/31_duration_compare.ts | complete | Duration.Input, Duration.fromInput, Duration.isGreaterThan |  |
| 122 | 05_data/32_predicates.ts | complete | Predicate.Predicate, Predicate.isString, Predicate.isNumber, Predicate.and, Predicate.or, Predicate.not |  |
| 123 | 05_data/33_translate_optional_chaining.ts | translate |  | Option.flatMap, Option.getOrElse, Option.fromNullishOr |
| 124 | 05_data/34_translate_switch.ts | translate |  | Match.type, Match.tag, Match.exhaustive |
| 125 | 05_data/35_capstone_inventory.ts | complete | Arr.getSuccesses, Arr.getFailures | Option.fromNullishOr, Option.filter, Option.map, Option.match, Result.succeed, Result.fail |
| 126 | 06_services/01_define_a_service.ts | fix | Context.Service | Effect.provideService |
| 127 | 06_services/02_use_a_service.ts | complete |  | Context.Service, yield*, Effect.gen |
| 128 | 06_services/03_implementing_a_service.ts | complete |  | Context.Service, Effect.provideService |
| 129 | 06_services/04_use_shortcuts.ts | complete |  | Context.Service |
| 130 | 06_services/05_layer_succeed.ts | complete | Layer.succeed, Layer.Layer, Effect.provide |  |
| 131 | 06_services/06_layer_effect.ts | complete | Layer.effect |  |
| 132 | 06_services/07_static_layer.ts | complete |  | Layer.succeed, Layer.Layer |
| 133 | 06_services/08_reading_layer_types.ts | fix | Layer.Success, Layer.Error, Layer.Services |  |
| 134 | 06_services/09_layer_provide.ts | complete | Layer.provide |  |
| 135 | 06_services/10_layer_provide_merge.ts | complete | Layer.provideMerge |  |
| 136 | 06_services/11_layer_merge.ts | complete | Layer.merge, Layer.mergeAll |  |
| 137 | 06_services/12_provide_order.ts | fix |  | Effect.provide, Layer.provide |
| 138 | 06_services/13_layer_memoization.ts | complete |  | Layer.effect, Layer.mergeAll, Layer.provide, Effect.provide |
| 139 | 06_services/14_layer_fresh.ts | complete | Layer.fresh |  |
| 140 | 06_services/15_reference.ts | complete | Context.Reference |  |
| 141 | 06_services/16_service_option.ts | complete | Effect.serviceOption |  |
| 142 | 06_services/17_update_service.ts | complete | Effect.updateService |  |
| 143 | 06_services/18_make_option.ts | complete |  | Layer.effect, Context.Service |
| 144 | 06_services/19_swap_implementations.ts | complete |  | Layer.succeed, Effect.provide, Effect.fn |
| 145 | 06_services/20_layer_mock.ts | complete | Layer.mock |  |
| 146 | 06_services/21_layer_failure.ts | complete |  | Layer.effect, Layer.Layer, Data.TaggedError, Effect.provide |
| 147 | 06_services/22_translate_constructor_injection.ts | translate |  | Layer.effect, Layer.Layer, Effect.fn, Context.Service |
| 148 | 06_services/23_translate_global_config.ts | translate |  | Context.Service, Layer.succeed, Effect.provide, Effect.fn |
| 149 | 06_services/24_capstone_welcome.ts | complete |  | Layer.effect, Layer.provide, Layer.mergeAll, Effect.provide, Context.Service |
| 150 | 07_resources/01_ensuring.ts | complete | Effect.ensuring |  |
| 151 | 07_resources/02_on_exit.ts | complete | Effect.onExit |  |
| 152 | 07_resources/03_acquire_use_release.ts | complete | Effect.acquireUseRelease |  |
| 153 | 07_resources/04_release_always_runs.ts | complete |  | Effect.acquireUseRelease, Effect.gen, Effect.fail |
| 154 | 07_resources/05_acquire_release_scoped.ts | complete | Effect.acquireRelease, Effect.scoped |  |
| 155 | 07_resources/06_scope_in_the_type.ts | fix | Scope.Scope |  |
| 156 | 07_resources/07_release_order.ts | complete |  | Effect.acquireRelease, Effect.scoped, Effect.gen |
| 157 | 07_resources/08_add_finalizer.ts | complete | Effect.addFinalizer |  |
| 158 | 07_resources/09_finalizers_see_the_exit.ts | complete |  | Effect.addFinalizer, Effect.scoped |
| 159 | 07_resources/10_layer_with_a_resource.ts | complete |  | Layer.effect, Effect.acquireRelease, Effect.provide |
| 160 | 07_resources/11_manual_scope.ts | fix | Scope.make, Scope.close, Exit.void |  |
| 161 | 07_resources/12_translate_try_finally.ts | translate |  | Effect.acquireUseRelease |
| 162 | 07_resources/13_translate_nested_resources.ts | translate |  | Effect.acquireRelease, Effect.scoped, Effect.gen |
| 163 | 07_resources/14_capstone_startup_shutdown.ts | complete |  | Layer.effect, Layer.provide, Effect.acquireRelease, Effect.provide |
| 164 | 08_concurrency/01_fork_and_join.ts | complete | Effect.forkChild, Fiber.join |  |
| 165 | 08_concurrency/02_fork_order.ts | complete |  | Effect.forkChild, Fiber.join, Effect.sleep, Effect.tap |
| 166 | 08_concurrency/03_await_vs_join.ts | complete | Fiber.await |  |
| 167 | 08_concurrency/04_interrupt.ts | complete | Fiber.interrupt, Effect.never, Effect.yieldNow, Cause.hasInterrupts |  |
| 168 | 08_concurrency/05_on_interrupt.ts | complete | Effect.onInterrupt |  |
| 169 | 08_concurrency/06_uninterruptible.ts | fix | Effect.uninterruptible |  |
| 170 | 08_concurrency/07_children_end_with_parent.ts | complete |  | Effect.forkChild, Effect.onInterrupt, Effect.yieldNow |
| 171 | 08_concurrency/08_fork_detach.ts | complete | Effect.forkDetach |  |
| 172 | 08_concurrency/09_fork_scoped.ts | complete | Effect.forkScoped |  |
| 173 | 08_concurrency/10_all_concurrently.ts | fix |  | Effect.all, Effect.sleep |
| 174 | 08_concurrency/11_concurrency_limit.ts | complete |  | Effect.forEach, Effect.sleep |
| 175 | 08_concurrency/12_race.ts | complete | Effect.race |  |
| 176 | 08_concurrency/13_timeout.ts | complete | Effect.timeout |  |
| 177 | 08_concurrency/14_timeout_or_else.ts | complete | Effect.timeoutOrElse |  |
| 178 | 08_concurrency/15_ref_basics.ts | complete | Ref.Ref, Ref.make, Ref.get, Ref.set |  |
| 179 | 08_concurrency/16_ref_update.ts | complete | Ref.update, Ref.updateAndGet |  |
| 180 | 08_concurrency/17_ref_modify.ts | complete | Ref.modify |  |
| 181 | 08_concurrency/18_ref_many_fibers.ts | complete |  | Ref.make, Ref.update, Ref.get, Effect.forEach |
| 182 | 08_concurrency/19_deferred.ts | complete | Deferred.make, Deferred.succeed, Deferred.await |  |
| 183 | 08_concurrency/20_deferred_fail.ts | complete | Deferred.fail |  |
| 184 | 08_concurrency/21_latch.ts | complete | Latch.make, Latch.open, Latch.await |  |
| 185 | 08_concurrency/22_semaphore.ts | complete | Semaphore.make, Semaphore.withPermits |  |
| 186 | 08_concurrency/23_queue_basics.ts | complete | Queue.Queue, Queue.unbounded, Queue.offer, Queue.offerAll, Queue.take |  |
| 187 | 08_concurrency/24_queue_backpressure.ts | complete | Queue.bounded |  |
| 188 | 08_concurrency/25_producer_consumer.ts | complete |  | Queue.unbounded, Queue.offer, Queue.take, Effect.forkChild, Fiber.join |
| 189 | 08_concurrency/26_queue_dropping.ts | complete | Queue.dropping, Queue.takeAll |  |
| 190 | 08_concurrency/27_pubsub.ts | complete | PubSub.unbounded, PubSub.subscribe, PubSub.publish, PubSub.take |  |
| 191 | 08_concurrency/28_translate_promise_combinators.ts | translate |  | Effect.all, Effect.race |
| 192 | 08_concurrency/29_translate_limit_parallel.ts | translate |  | Effect.forEach |
| 193 | 08_concurrency/30_translate_abort_signal.ts | translate |  | Effect.tryPromise, Fiber.interrupt, Effect.forkChild, Effect.yieldNow |
| 194 | 08_concurrency/31_capstone_workers.ts | complete |  | Queue.unbounded, Queue.offerAll, Queue.take, Ref.make, Ref.update, Ref.get, Effect.forkChild, Fiber.join |
| 195 | 09_schema/01_decode_primitives.ts | complete | Schema.String, Schema.Number, Schema.decodeUnknownSync |  |
| 196 | 09_schema/02_struct.ts | complete | Schema.Struct, Schema.Codec |  |
| 197 | 09_schema/03_decode_failure.ts | complete | Schema.isSchemaError |  |
| 198 | 09_schema/04_decode_option.ts | complete | Schema.decodeUnknownOption |  |
| 199 | 09_schema/05_decode_effect.ts | complete | Schema.decodeUnknownEffect, Schema.SchemaError |  |
| 200 | 09_schema/06_is_guard.ts | complete | Schema.is |  |
| 201 | 09_schema/07_optional_fields.ts | complete | Schema.optionalKey, Schema.optional |  |
| 202 | 09_schema/08_nullable.ts | complete | Schema.NullOr |  |
| 203 | 09_schema/09_array.ts | complete | Schema.Array |  |
| 204 | 09_schema/10_record.ts | complete | Schema.Record |  |
| 205 | 09_schema/11_tuple.ts | complete | Schema.Tuple |  |
| 206 | 09_schema/12_literals.ts | complete | Schema.Literal, Schema.Literals |  |
| 207 | 09_schema/13_union.ts | complete | Schema.Union |  |
| 208 | 09_schema/14_tagged_struct.ts | complete | Schema.TaggedStruct | Schema.Struct, Schema.Union |
| 209 | 09_schema/15_string_checks.ts | complete | Schema.isMinLength, Schema.isMaxLength, Schema.isPattern |  |
| 210 | 09_schema/16_number_checks.ts | complete | Schema.isInt, Schema.isBetween |  |
| 211 | 09_schema/17_error_messages.ts | complete | Schema.isGreaterThan |  |
| 212 | 09_schema/18_make_filter.ts | complete | Schema.makeFilter |  |
| 213 | 09_schema/19_brand.ts | complete | Schema.brand |  |
| 214 | 09_schema/20_brand_safety.ts | fix |  | Schema.brand, Schema.decodeUnknownSync |
| 215 | 09_schema/21_number_from_string.ts | complete | Schema.NumberFromString, Schema.encodeSync |  |
| 216 | 09_schema/22_type_vs_encoded.ts | fix | Schema.DateFromString |  |
| 217 | 09_schema/23_roundtrip.ts | complete |  | Schema.encodeSync, Schema.NumberFromString, Schema.DateFromString |
| 218 | 09_schema/24_transform.ts | complete | Schema.Finite, Schema.decode, SchemaTransformation.transform |  |
| 219 | 09_schema/25_decode_to.ts | complete | Schema.decodeTo |  |
| 220 | 09_schema/26_trim_and_lowercase.ts | complete | SchemaTransformation.trim, SchemaTransformation.toLowerCase |  |
| 221 | 09_schema/27_decoding_default.ts | complete | Schema.withDecodingDefaultKey |  |
| 222 | 09_schema/28_constructor_default.ts | fix | Schema.withConstructorDefault |  |
| 223 | 09_schema/29_make_validates.ts | complete |  | Schema.Struct, Schema.isBetween |
| 224 | 09_schema/30_class.ts | fix | Schema.Class |  |
| 225 | 09_schema/31_tagged_class.ts | fix | Schema.TaggedClass |  |
| 226 | 09_schema/32_tagged_error_class.ts | fix | Schema.TaggedError |  |
| 227 | 09_schema/33_json_strings.ts | complete | Schema.fromJsonString |  |
| 228 | 09_schema/34_option_from_null.ts | complete | Schema.OptionFromNullOr |  |
| 229 | 09_schema/35_reuse_fields.ts | complete | Schema.fieldsAssign |  |
| 230 | 09_schema/36_recursive.ts | complete | Schema.suspend |  |
| 231 | 09_schema/37_translate_type_guard.ts | translate |  | Schema.Struct, Schema.is |
| 232 | 09_schema/38_translate_json_parse.ts | translate |  | Schema.fromJsonString, Schema.decodeUnknownEffect, Schema.SchemaError, Schema.isSchemaError |
| 233 | 09_schema/39_capstone_config.ts | complete |  | Schema.Struct, Schema.isInt, Schema.isBetween, Schema.Literals, Schema.withDecodingDefaultKey, Schema.fromJsonString, Schema.decodeUnknownEffect, Effect.mapError |
| 234 | 10_streams/01_make_and_collect.ts | complete | Stream.make, Stream.map, Stream.runCollect |  |
| 235 | 10_streams/02_from_iterable.ts | complete | Stream.fromIterable, Stream.range, Stream.filter |  |
| 236 | 10_streams/03_take_and_drop.ts | complete | Stream.take, Stream.drop |  |
| 237 | 10_streams/04_infinite_streams.ts | complete | Stream.iterate |  |
| 238 | 10_streams/05_laziness.ts | complete | Stream.tap | Stream.iterate, Stream.take |
| 239 | 10_streams/06_run_fold.ts | complete | Stream.runFold, Stream.runSum, Stream.runCount |  |
| 240 | 10_streams/07_run_for_each.ts | complete | Stream.runForEach, Stream.runDrain |  |
| 241 | 10_streams/08_head_and_last.ts | complete | Stream.runHead, Stream.runLast, Stream.Stream, Stream.empty |  |
| 242 | 10_streams/09_map_effect.ts | complete | Stream.mapEffect |  |
| 243 | 10_streams/10_flat_map.ts | complete | Stream.flatMap |  |
| 244 | 10_streams/11_concat_and_zip.ts | complete | Stream.concat, Stream.zip |  |
| 245 | 10_streams/12_scan.ts | complete | Stream.scan |  |
| 246 | 10_streams/13_take_while_until.ts | complete | Stream.takeWhile, Stream.takeUntil |  |
| 247 | 10_streams/14_grouped.ts | complete | Stream.grouped |  |
| 248 | 10_streams/15_unfold.ts | complete | Stream.unfold |  |
| 249 | 10_streams/16_paginate.ts | complete | Stream.paginate |  |
| 250 | 10_streams/17_from_effect.ts | complete | Stream.fromEffect, Stream.forever |  |
| 251 | 10_streams/18_stream_errors.ts | complete | Stream.catch | Stream.mapEffect, Effect.exit |
| 252 | 10_streams/19_ensuring.ts | complete | Stream.ensuring |  |
| 253 | 10_streams/20_from_queue.ts | complete | Stream.fromQueue, Queue.end, Cause.Done |  |
| 254 | 10_streams/21_callback.ts | complete | Stream.callback, Queue.offerUnsafe, Queue.endUnsafe |  |
| 255 | 10_streams/22_sink_basics.ts | complete | Stream.run, Sink.sum, Sink.collect |  |
| 256 | 10_streams/23_sink_take_count.ts | complete | Sink.take, Sink.count |  |
| 257 | 10_streams/24_sink_reduce.ts | complete | Sink.reduce, Sink.Sink |  |
| 258 | 10_streams/25_merge.ts | complete | Stream.merge |  |
| 259 | 10_streams/26_split_lines.ts | complete | Stream.splitLines |  |
| 260 | 10_streams/27_translate_array_pipeline.ts | translate |  | Stream.fromIterable, Stream.filter, Stream.map, Stream.runCollect, Stream.runSum |
| 261 | 10_streams/28_translate_async_iterator.ts | translate | Stream.fromAsyncIterable | Stream.map, Stream.runCollect |
| 262 | 10_streams/29_capstone_log_summary.ts | complete |  | Stream.fromIterable, Stream.splitLines, Stream.filter, Stream.map, Stream.runFold |
| 263 | 11_time/01_retry_times.ts | complete | Effect.retry |  |
| 264 | 11_time/02_retry_exhausted.ts | complete |  | Effect.retry, Effect.exit |
| 265 | 11_time/03_retry_while.ts | complete |  | Effect.retry, Data.TaggedError |
| 266 | 11_time/04_schedule_recurs.ts | complete | Schedule.Schedule, Schedule.recurs |  |
| 267 | 11_time/05_test_clock.ts | complete | TestClock.layer, TestClock.adjust |  |
| 268 | 11_time/06_retry_spaced.ts | complete | Schedule.spaced |  |
| 269 | 11_time/07_exponential_backoff.ts | complete | Schedule.exponential |  |
| 270 | 11_time/08_schedule_up_to.ts | complete | Schedule.upTo |  |
| 271 | 11_time/09_repeat.ts | complete | Effect.repeat |  |
| 272 | 11_time/10_repeat_until.ts | complete |  | Effect.repeat |
| 273 | 11_time/11_repeat_schedule.ts | complete |  | Effect.repeat, Schedule.spaced |
| 274 | 11_time/12_timeout_with_test_clock.ts | complete |  | Effect.timeout, Effect.catchTag, TestClock.adjust, Fiber.join |
| 275 | 11_time/13_datetime_make.ts | complete | DateTime.Utc, DateTime.makeUnsafe, DateTime.make, DateTime.formatIso, DateTime.toEpochMillis |  |
| 276 | 11_time/14_datetime_arithmetic.ts | complete | DateTime.add, DateTime.subtract, DateTime.startOf, DateTime.endOf |  |
| 277 | 11_time/15_datetime_compare.ts | complete | DateTime.isGreaterThan, DateTime.distance |  |
| 278 | 11_time/16_datetime_now.ts | complete | DateTime.now, TestClock.setTime |  |
| 279 | 11_time/17_datetime_zoned.ts | complete | DateTime.makeZoned, DateTime.formatIsoZoned |  |
| 280 | 11_time/18_translate_set_interval.ts | translate |  | Effect.repeat, Schedule.spaced |
| 281 | 11_time/19_translate_retry_loop.ts | translate |  | Effect.retry, Schedule.exponential, Schedule.upTo |
| 282 | 11_time/20_capstone_poll_until_ready.ts | complete |  | Effect.repeat, Schedule.spaced, Effect.timeout, Effect.catchTag, TestClock.adjust, Fiber.join |
| 283 | 12_observability/01_config_string.ts | complete | Config.String, Config.ConfigError, ConfigProvider.fromUnknown, ConfigProvider.layer |  |
| 284 | 12_observability/02_config_types.ts | complete | Config.Number, Config.Int, Config.Boolean, Config.Port |  |
| 285 | 12_observability/03_config_with_default.ts | complete | Config.withDefault, Config.Config |  |
| 286 | 12_observability/04_config_option.ts | complete | Config.option |  |
| 287 | 12_observability/05_config_all.ts | complete | Config.all |  |
| 288 | 12_observability/06_config_nested.ts | complete | Config.nested |  |
| 289 | 12_observability/07_config_from_env.ts | complete | ConfigProvider.fromEnvRecord |  |
| 290 | 12_observability/08_config_errors.ts | complete |  | Config.Port, Effect.catchTag, ConfigProvider.layer |
| 291 | 12_observability/09_config_redacted.ts | complete | Config.Redacted, Redacted.value |  |
| 292 | 12_observability/10_config_map_and_or_else.ts | complete | Config.map, Config.orElse |  |
| 293 | 12_observability/11_config_schema.ts | complete | Config.schema |  |
| 294 | 12_observability/12_config_in_a_layer.ts | complete |  | Layer.effect, Context.Service, Config.Port, Config.String, Effect.provide |
| 295 | 12_observability/13_translate_process_env.ts | translate |  | Config.String, Config.Int, Config.withDefault, Config.all |
| 296 | 12_observability/14_log_basics.ts | complete | Effect.logInfo, Effect.logWarning, Effect.logError, Effect.logDebug |  |
| 297 | 12_observability/15_log_default.ts | complete | Effect.log |  |
| 298 | 12_observability/16_log_annotations.ts | complete | Effect.annotateLogs |  |
| 299 | 12_observability/17_log_spans.ts | complete | Effect.withLogSpan |  |
| 300 | 12_observability/18_log_levels.ts | complete | References.MinimumLogLevel |  |
| 301 | 12_observability/19_custom_logger.ts | complete | Logger.make, Logger.layer |  |
| 302 | 12_observability/20_log_failures.ts | complete |  | Effect.tapError, Effect.logError, Effect.catch |
| 303 | 12_observability/21_metric_counter.ts | complete | Metric.counter, Metric.update, Metric.value |  |
| 304 | 12_observability/22_metric_in_code.ts | complete |  | Metric.counter, Metric.update, Metric.value, Effect.tap, Effect.tapError |
| 305 | 12_observability/23_metric_gauge.ts | complete | Metric.gauge |  |
| 306 | 12_observability/24_metric_histogram.ts | complete | Metric.histogram, Metric.linearBoundaries |  |
| 307 | 12_observability/25_metric_frequency.ts | complete | Metric.frequency |  |
| 308 | 12_observability/26_metric_attributes.ts | complete | Metric.withAttributes |  |
| 309 | 12_observability/27_with_span.ts | complete | Effect.withSpan, Effect.withTracer |  |
| 310 | 12_observability/28_nested_spans.ts | complete |  | Effect.withSpan, Effect.gen, yield* |
| 311 | 12_observability/29_span_attributes.ts | complete | Effect.annotateCurrentSpan |  |
| 312 | 12_observability/30_fn_makes_spans.ts | complete |  | Effect.fn, Effect.withTracer |
| 313 | 12_observability/31_capstone_instrumented.ts | complete |  | Effect.fn, Effect.annotateLogs, Effect.logInfo, Effect.logError, Effect.tapError, Metric.update, Metric.counter, Config.Int, Config.withDefault, Effect.annotateCurrentSpan |
